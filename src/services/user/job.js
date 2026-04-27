import * as Discord from "discord.js";

import * as Models from "@/models/user/job";
import * as Message from "@/templates/job";
import * as Pattern from "@/services/pattern";
import * as Role from "@/services/user/role";
import * as Experience from "@/services/user/experience";
import * as Rank from "@/services/user/rank";

import config from "config";

const { experience } = config;
const { choice } = experience;

const { MessageFlags, ComponentType } = Discord;
const { StringSelect, Button } = ComponentType;

const IDLE = 120_000;

const Collector = {};

const context = ["job"];
const pattern = (...args) => Pattern.build(context, ...args);

const options = ({ title, short }, index) =>
  new Discord.StringSelectMenuOptionBuilder().setLabel(title).setDescription(short).setValue(`${index}`);

const selection = async (interaction, classes, mode = "edition") => {
  const title = await pattern("title");
  const description = await pattern("description");
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
  if (mode === "creation") return interaction.reply({ ...content, flags: MessageFlags.Ephemeral });
  return interaction.update({ ...content, flags: MessageFlags.Ephemeral });
};

const refusal = async (interaction) => {
  const title = await pattern("title");
  const description = await pattern("refusal");
  await interaction.update(Message.build({ title, description, components: [] }));
};

export const chose = async (interaction) => {
  const { author = {}, member } = interaction;
  const { displayName } = member;
  const { username } = author;
  const display = displayName || username;
  const classes = await Models.list();

  let job = null;

  const response = await selection(interaction, classes, "creation");

  Collector.select = response.createMessageComponentCollector({ componentType: StringSelect, IDLE });
  Collector.button = response.createMessageComponentCollector({ componentType: Button, IDLE });

  Collector.select.on("collect", async (interaction) => {
    const { values, customId } = interaction;
    const [value] = values;

    if (customId === "job") {
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
  });

  Collector.select.on("end", async (interaction) => {
    await refusal(interaction);
  });

  Collector.button.on("collect", async (interaction) => {
    const { customId } = interaction;
    if (customId === "accept") {
      const { id, title: path, long } = classes[job];
      const title = await pattern("accepted");
      const description = await pattern("accept", { path, long, user: display });
      await interaction.update(Message.build({ title, description, components: [] }));
      await Role.add(member, id);
    }
    if (customId === "back") {
      await selection(interaction, classes);
    }
    if (customId === "cancel") {
      await refusal(interaction);
    }
  });
};

export const manual = async (interaction) => {
  const { user } = interaction;
  const { id } = user;

  if (!interaction.isChatInputCommand()) return;

  const current = await Experience.get(id);
  const { experience } = await Rank.one(choice);
  const content = await pattern("inexperienced");
  const inexperienced = { content, flags: MessageFlags.Ephemeral };
  if (current < experience) return interaction.reply(inexperienced);
  await chose(interaction);
};
