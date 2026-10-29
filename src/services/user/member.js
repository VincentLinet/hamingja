import * as Discord from "discord.js";

import * as Locale from "@/services/locale";
import Data from "@/messages/member";

const { MessageFlags } = Discord;

const { GUILD } = process.env;

export const resolve = async (interaction) => {
  const { client, user, member } = interaction;
  if (member) return member;
  const guild = await client.guilds.fetch(GUILD);
  const members = await guild.members.fetch({ user: [user.id] });
  return members.first();
};

export const absent = async (interaction) => {
  const { channelId } = interaction;
  await interaction.reply({ content: Data[Locale.of(channelId)].absent, flags: MessageFlags.Ephemeral });
};
