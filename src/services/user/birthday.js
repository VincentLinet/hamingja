import * as Discord from "discord.js";

import * as Models from "@/models/user/birthday";
import * as Strings from "@/services/strings";
import Data from "@/messages/birthday";

const { MessageFlags } = Discord;

const { BIRTHDAY, FESTIVAL, GUILD } = process.env;

const DEFAULT_TIMEZONE = "Europe/Paris";
const HOUR = 36e5;

const TIMEZONES = [
  "Pacific/Honolulu",
  "America/Anchorage",
  "America/Los_Angeles",
  "America/Denver",
  "America/Mexico_City",
  "America/Chicago",
  "America/New_York",
  "America/Halifax",
  "America/Sao_Paulo",
  "Atlantic/Azores",
  "Europe/London",
  "Europe/Paris",
  "Europe/Helsinki",
  "Europe/Moscow",
  "Asia/Dubai",
  "Asia/Karachi",
  "Asia/Kolkata",
  "Asia/Dhaka",
  "Asia/Bangkok",
  "Asia/Shanghai",
  "Asia/Tokyo",
  "Australia/Adelaide",
  "Australia/Sydney",
  "Pacific/Noumea",
  "Pacific/Auckland"
];

const MONTHS = Array.from({ length: 12 }, (_, month) =>
  new Date(Date.UTC(2000, month, 1)).toLocaleDateString("en-EN", { month: "long", timeZone: "UTC" })
);

const flags = MessageFlags.Ephemeral;

const offset = (timezone) =>
  new Intl.DateTimeFormat("en-EN", { timeZone: timezone, timeZoneName: "shortOffset" })
    .formatToParts(new Date())
    .find(({ type }) => type === "timeZoneName").value;

const city = (timezone) => timezone.split("/").pop().replace(/_/g, " ");

const exists = (day, month) => new Date(Date.UTC(2000, month - 1, day)).getUTCDate() === day;

const label = (day, month) => `${MONTHS[month - 1]} ${day}`;

const today = (timezone, now = new Date()) =>
  new Intl.DateTimeFormat("en-EN", { timeZone: timezone, year: "numeric", month: "numeric", day: "numeric" })
    .formatToParts(now)
    .reduce((acc, { type, value }) => ({ ...acc, [type]: Number(value) }), {});

const leap = (year) => new Date(Date.UTC(year, 1, 29)).getUTCDate() === 29;

const matches = ({ day, month }, local) => {
  if (day === local.day && month === local.month) return true;
  return day === 29 && month === 2 && local.day === 28 && local.month === 2 && !leap(local.year);
};

export const open = async (interaction) => {
  const { day, month, timezone = DEFAULT_TIMEZONE } = (await Models.one(interaction.user.id)) ?? {};

  const input = new Discord.TextInputBuilder()
    .setCustomId("day")
    .setStyle(Discord.TextInputStyle.Short)
    .setMinLength(1)
    .setMaxLength(2)
    .setRequired(true);

  if (day) input.setValue(String(day));

  const months = new Discord.StringSelectMenuBuilder()
    .setCustomId("month")
    .setRequired(true)
    .addOptions(
      MONTHS.map((name, index) =>
        new Discord.StringSelectMenuOptionBuilder()
          .setLabel(name)
          .setValue(String(index + 1))
          .setDefault(month === index + 1)
      )
    );

  const timezones = new Discord.StringSelectMenuBuilder()
    .setCustomId("timezone")
    .setRequired(true)
    .addOptions(
      TIMEZONES.map((zone) =>
        new Discord.StringSelectMenuOptionBuilder()
          .setLabel(city(zone))
          .setDescription(`${zone} (${offset(zone)})`)
          .setValue(zone)
          .setDefault(zone === timezone)
      )
    );

  const modal = new Discord.ModalBuilder()
    .setCustomId("birthday")
    .setTitle("Your birthday")
    .addTextDisplayComponents(new Discord.TextDisplayBuilder().setContent(Data.notice))
    .addLabelComponents(
      new Discord.LabelBuilder().setLabel("Day").setTextInputComponent(input),
      new Discord.LabelBuilder().setLabel("Month").setStringSelectMenuComponent(months),
      new Discord.LabelBuilder()
        .setLabel("Timezone")
        .setDescription("Pick the closest city sharing your time")
        .setStringSelectMenuComponent(timezones)
    );

  await interaction.showModal(modal);
};

export const submit = async (interaction) => {
  const { user, fields } = interaction;

  const day = Number(fields.getTextInputValue("day").trim());
  const month = Number(fields.getStringSelectValues("month")[0]);
  const [timezone] = fields.getStringSelectValues("timezone");

  if (!Number.isInteger(day) || !exists(day, month) || !TIMEZONES.includes(timezone))
    return interaction.reply({ content: Data.invalid, flags });

  await Models.set(user.id, day, month, timezone);

  const content = Strings.inject(Data.registered, { date: label(day, month), timezone: city(timezone) });
  await interaction.reply({ content, flags });
};

export const remove = async (interaction) => {
  const removed = await Models.remove(interaction.user.id);
  await interaction.reply({ content: removed ? Data.removed : Data.missing, flags });
};

export const forget = async ({ id }) => {
  return Models.remove(id);
};

const celebrate = async (client) => {
  const birthdays = await Models.list();
  const now = new Date();

  const due = birthdays
    .map((birthday) => ({ ...birthday, local: today(birthday.timezone, now) }))
    .filter(({ local, announced, ...birthday }) => matches(birthday, local) && announced !== local.year);

  if (!due.length) return;

  const guild = await client.guilds.fetch(GUILD);
  const channel = await client.channels.fetch(BIRTHDAY ?? FESTIVAL);

  const members = await guild.members.fetch({ user: due.map(({ user }) => user) });

  for (const { user, local } of due) {
    if (!members.has(user)) continue;

    const wish = Data.wishes[Math.floor(Math.random() * Data.wishes.length)];
    await channel.send({ content: Strings.inject(wish, { user }) });
    await Models.announce(user, local.year);
  }
};

export const schedule = (client) => {
  celebrate(client);

  const delay = HOUR - (Date.now() % HOUR);
  setTimeout(() => {
    celebrate(client);
    setInterval(() => celebrate(client), HOUR);
  }, delay);
};
