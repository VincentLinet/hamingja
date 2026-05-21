import * as Discord from "discord.js";

import * as Rank from "@/services/user/rank";

const data = new Discord.SlashCommandBuilder().setName("me").setDescription("Displays the adventurer's information.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Rank.individual(interaction);
};

export default { data, execute };
