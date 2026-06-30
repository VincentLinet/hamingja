import * as Discord from "discord.js";

import * as Futhark from "@/services/futhark";

const data = new Discord.SlashCommandBuilder()
  .setName("draw")
  .setDescription("Draw a rune.")

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Futhark.draw(interaction);
};

export default { data, execute };
