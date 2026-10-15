import * as Discord from "discord.js";

import * as Census from "@/services/user/census";

const data = new Discord.SlashCommandBuilder().setName("ranks").setDescription("Count the members holding each rank.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Census.ranks(interaction);
};

export default { data, execute };
