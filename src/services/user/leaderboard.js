import * as Discord from "discord.js";

import * as Models from "@/models/user/experience";
import * as Locale from "@/services/locale";
import * as Strings from "@/services/strings";
import * as Base from "@/templates/base";
import Data from "@/messages/leaderboard";

const { MessageFlags, ButtonStyle } = Discord;

const { IMMORTALS, CACTI } = process.env;

const excluded = IMMORTALS?.split(",").filter((id) => id !== CACTI) ?? [];

// Never empty, an empty NOT IN () list is invalid SQL
const immortals = excluded.length ? excluded : [""];

const SIZE = 10;

// Custom ids must be unique within a message, so the direction is kept next to the target page
const button = (direction, emoji, page, disabled) =>
  new Discord.ButtonBuilder()
    .setCustomId(`leaderboard:${direction}:${page}`)
    .setStyle(ButtonStyle.Secondary)
    .setEmoji(emoji)
    .setDisabled(disabled);

const navigation = (page, pages) =>
  new Discord.ActionRowBuilder().addComponents(
    button("first", "⏮️", 0, page === 0),
    button("previous", "◀️", page - 1, page === 0),
    button("next", "▶️", page + 1, page >= pages - 1),
    button("last", "⏭️", pages - 1, page >= pages - 1)
  );

const render = async (interaction, requested) => {
  const { user, channelId } = interaction;
  const text = Data[Locale.of(channelId)];

  const total = await Models.total(immortals);
  const pages = Math.max(1, Math.ceil(total / SIZE));
  const page = Math.min(Math.max(requested, 0), pages - 1);

  const rows = await Models.page(SIZE, page * SIZE, immortals);
  const rank = await Models.place(user.id, immortals);

  const lines = rows.map(({ id, experience, position }) =>
    Strings.inject(text.line, { position, user: id, experience })
  );

  const description = lines.join("\n") || text.empty;
  const footer = {
    text: Strings.inject(rank ? text.footer : text.unranked, { current: page + 1, pages, place: rank })
  };

  return { ...Base.message({ title: text.title, description, footer }), components: [navigation(page, pages)] };
};

export const show = async (interaction) => {
  await interaction.reply({ ...(await render(interaction, 0)), flags: MessageFlags.Ephemeral });
};

export const navigate = async (interaction) => {
  const [, , page] = interaction.customId.split(":");
  await interaction.update(await render(interaction, Number(page)));
};
