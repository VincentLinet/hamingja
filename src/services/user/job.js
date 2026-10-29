import * as Discord from "discord.js";

import * as Models from "@/models/user/job";
import * as Message from "@/templates/job";
import * as Pattern from "@/services/pattern";
import * as Locale from "@/services/locale";
import * as Role from "@/services/user/role";
import * as Experience from "@/services/user/experience";
import * as Rank from "@/services/user/rank";
import * as Member from "@/services/user/member";

import config from "config";

const { experience } = config;
const { choice } = experience;

const { MessageFlags } = Discord;

const IDLE = 120_000;

const pattern = (interaction, name, injections) => Pattern.build(["job", Locale.of(interaction.channelId)], name, injections);

const options = ({ title, short }, index) =>
  new Discord.StringSelectMenuOptionBuilder().setLabel(title).setDescription(short).setValue(`${index}`);

const selection = async (interaction, classes, channel, mode = "edition") => {
  const title = await pattern(interaction, "title");
  const description = await pattern(interaction, "description");
  const select = new Discord.StringSelectMenuBuilder()
    .setCustomId("job")
    .setPlaceholder("Class...")
    .addOptions(...classes.map(options));
  const refuse = new Discord.ButtonBuilder()
    .setCustomId("cancel")
    .setLabel("I'm not interested")
    .setStyle(Discord.ButtonStyle.Danger);

  const components = [
    new Discord.ActionRowBuilder().addComponents(select),
    new Discord.ActionRowBuilder().addComponents(refuse)
  ];
  const content = Message.build({ title, description, components });
  if (mode === "edition") return interaction.update({ ...content, flags: MessageFlags.Ephemeral });
  if (channel) return channel.send(content);
  return interaction.reply({ ...content, flags: MessageFlags.Ephemeral });
};

const refusal = async (interaction) => {
  const title = await pattern(interaction, "title");
  const description = await pattern(interaction, "refusal");
  return Message.build({ title, description, components: [] });
};

export const list = async (locale) => {
  return Models.list(locale);
};

export const chose = async (interaction, direct, member = interaction.member) => {
  const { author = {}, channelId: channel } = interaction;
  const { displayName } = member;
  const { username } = author;
  const display = displayName || username;
  const classes = await Models.list(Locale.of(channel));

  let job = null;

  const dm = !direct && (await member.createDM());

  const response = await selection(interaction, classes, dm, "creation");

  // One collector for the whole flow, so the idle timer resets on any click
  const collector = response.createMessageComponentCollector({ idle: IDLE });

  collector.on("collect", async (interaction) => {
    const { customId } = interaction;

    if (customId === "job") {
      const [value] = interaction.values;
      const { title, short, long } = classes[value];
      job = value;
      const description = long || short;
      const accept = new Discord.ButtonBuilder()
        .setCustomId("accept")
        .setLabel("Accept")
        .setStyle(Discord.ButtonStyle.Success);
      const back = new Discord.ButtonBuilder()
        .setCustomId("back")
        .setLabel("Back")
        .setStyle(Discord.ButtonStyle.Secondary);
      const cancel = new Discord.ButtonBuilder()
        .setCustomId("cancel")
        .setLabel("Chose later")
        .setStyle(Discord.ButtonStyle.Danger);
      const components = [new Discord.ActionRowBuilder({ components: [accept, back, cancel] })];
      await interaction.update(Message.build({ title, description, components }));
    }
    if (customId === "accept") {
      collector.stop("accept");
      const { id, title: path, long } = classes[job];
      const title = await pattern(interaction, "accepted");
      const description = await pattern(interaction, "accept", { path, long, user: display });
      const list = classes.map(({ id }) => id);
      await Role.swap(member, list, id);
      await interaction.update(Message.build({ title, description, components: [] }));
    }
    if (customId === "back") {
      await selection(interaction, classes);
    }
    if (customId === "cancel") {
      collector.stop("cancel");
      await interaction.update(await refusal(interaction));
    }
  });

  collector.on("end", async (_, reason) => {
    if (reason === "idle") await response.edit(await refusal(interaction));
  });
};

export const manual = async (interaction) => {
  const { user } = interaction;
  const { id } = user;

  if (!interaction.isChatInputCommand()) return;

  const current = await Experience.get(id);
  const { experience } = await Rank.one(choice);
  const content = await pattern(interaction, "inexperienced");
  const inexperienced = { content, flags: MessageFlags.Ephemeral };
  if (current < experience) return interaction.reply(inexperienced);

  const member = await Member.resolve(interaction);
  if (!member) return Member.absent(interaction);

  await chose(interaction, true, member);
};
