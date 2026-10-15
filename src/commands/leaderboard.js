import * as Discord from "discord.js";

import * as Leaderboard from "@/services/user/leaderboard";

const data = new Discord.SlashCommandBuilder()
  .setName("leaderboard")
  .setDescription("Browse the most experienced members of the Clan.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Leaderboard.show(interaction);
};

export default { data, execute };
