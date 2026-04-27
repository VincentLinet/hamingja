import * as Discord from "discord.js";

import * as Job from "@/services/user/job";

const data = new Discord.SlashCommandBuilder().setName("class").setDescription("Chose my class.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Job.manual(interaction);
};

export default { data, execute };
