import * as Discord from "discord.js";

import * as Census from "@/services/user/census";

const data = new Discord.SlashCommandBuilder()
  .setName("classes")
  .setDescription("Discover the classes of the Clan and how many walk each path.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Census.classes(interaction);
};

export default { data, execute };
