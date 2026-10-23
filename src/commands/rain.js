import * as Discord from "discord.js";

import * as Rain from "@/services/rain";

const data = new Discord.SlashCommandBuilder()
  .setName("rain")
  .setDescription("Ask Hamingja to summon the rain.");

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Rain.summon(interaction);
};

export default { data, execute };
