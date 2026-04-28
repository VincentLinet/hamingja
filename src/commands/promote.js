import * as Discord from "discord.js";

import * as Experience from "@/services/user/experience";

const data = new Discord.SlashCommandBuilder()
  .setName("promote")
  .setDescription("Promote every user to their rightful rank.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Experience.promote(interaction);
};

export default { data, execute };
