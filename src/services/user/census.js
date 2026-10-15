import * as Discord from "discord.js";

import * as Rank from "@/services/user/rank";
import * as Job from "@/services/user/job";
import * as Locale from "@/services/locale";
import * as Strings from "@/services/strings";
import * as Base from "@/templates/base";
import Data from "@/messages/census";

const { MessageFlags, ButtonStyle } = Discord;

const { GUILD, IMMORTALS } = process.env;

const immortals = IMMORTALS?.split(",") ?? [];

const flags = MessageFlags.Ephemeral;

const STYLES = [ButtonStyle.Primary, ButtonStyle.Success, ButtonStyle.Danger, ButtonStyle.Secondary];

// Discord action rows hold at most 5 buttons
const ROW = 5;

// Role member counts read the cache, so it is filled once at startup instead of on every command
export const gather = async (client) => {
  const guild = await client.guilds.fetch(GUILD);
  await guild.members.fetch();
};

const population = (guild, id) => guild.roles.cache.get(id)?.members.size ?? 0;

const mortals = (guild, id) => guild.roles.cache.get(id)?.members.filter(({ id }) => !immortals.includes(id)).size ?? 0;

const tint = (color = "255, 255, 255") => color.split(",").reduce((acc, value) => (acc << 8) + Number(value), 0);

export const ranks = async (interaction) => {
  const { guild, channelId } = interaction;
  const text = Data[Locale.of(channelId)];

  const list = await Rank.list();

  const counted = [...list].reverse().map((rank) => ({ ...rank, count: mortals(guild, rank.id) }));
  const highest = Math.max(
    0,
    counted.findIndex(({ count }) => count > 0)
  );

  const fields = counted
    .slice(highest)
    .map(({ title, count }) => ({ name: title, value: Strings.inject(text.holders, { count }) }));

  await interaction.reply({ ...Base.message({ title: text.ranks, description: text.hierarchy, fields }), flags });
};

const button = ({ id, title }, index) =>
  new Discord.ButtonBuilder()
    .setCustomId(`classes:${id}`)
    .setLabel(title)
    .setStyle(STYLES[index % STYLES.length]);

const rows = (buttons) =>
  Array.from({ length: Math.ceil(buttons.length / ROW) }, (_, index) =>
    new Discord.ActionRowBuilder().addComponents(buttons.slice(index * ROW, (index + 1) * ROW))
  );

const overview = (guild, text, jobs) => {
  const fields = jobs.map(({ id, title, short }) => ({ name: `${title} · ${population(guild, id)}`, value: short }));
  return {
    ...Base.message({ title: text.classes, description: text.intro, fields }),
    components: rows(jobs.map(button))
  };
};

const detail = (guild, text, { id, title, short, long, color }) => {
  const footer = { text: Strings.inject(text.count, { count: population(guild, id) }) };

  const back = new Discord.ButtonBuilder()
    .setCustomId("classes:back")
    .setLabel(text.back)
    .setStyle(ButtonStyle.Secondary);

  const components = [new Discord.ActionRowBuilder().addComponents(back)];

  return { ...Base.message({ title, description: long || short, color: tint(color), footer }), components };
};

export const classes = async (interaction) => {
  const { guild, channelId } = interaction;
  const locale = Locale.of(channelId);

  const jobs = await Job.list(locale);

  await interaction.reply({ ...overview(guild, Data[locale], jobs), flags });
};

export const browse = async (interaction) => {
  const { guild, channelId, customId } = interaction;
  const [, id] = customId.split(":");
  const locale = Locale.of(channelId);
  const text = Data[locale];

  const jobs = await Job.list(locale);
  const job = jobs.find((job) => job.id === id);

  if (!job) return interaction.update(overview(guild, text, jobs));
  await interaction.update(detail(guild, text, job));
};
