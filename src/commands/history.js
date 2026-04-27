import * as Discord from "discord.js";

import * as Experience from "@/services/user/experience";

const data = new Discord.SlashCommandBuilder()
  .setName("history")
  .setDescription("Catch up the experience history of every user.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Experience.history(interaction);
};

export default { data, execute };
