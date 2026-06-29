import * as Discord from "discord.js";

import * as Roll from "@/services/roll";

const data = new Discord.SlashCommandBuilder()
  .setName("roll")
  .setDescription("Roll the dice.")
  .addNumberOption((option) =>
    option.setName("value").setDescription("Maximum value").setRequired(false)
  );

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Roll.execute(interaction);
};

export default { data, execute };
