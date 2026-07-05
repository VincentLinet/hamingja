import * as Discord from "discord.js";

import * as Job from "@/services/user/job";

const data = new Discord.SlashCommandBuilder().setName("class").setDescription("Chose my class.")
  .setContexts(
    Discord.InteractionContextType.Guild,
    Discord.InteractionContextType.BotDM,
    Discord.InteractionContextType.PrivateChannel
  );

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Job.manual(interaction);
};

export default { data, execute };
