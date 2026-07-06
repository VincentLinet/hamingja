import * as Discord from "discord.js";
import * as Report from "@/services/report";

const data = new Discord.ContextMenuCommandBuilder()
  .setName("Report to Shieldwall")
  .setType(Discord.ApplicationCommandType.Message)
  .setContexts(Discord.InteractionContextType.Guild);

const execute = async (interaction) => {
  if (interaction.isMessageContextMenuCommand()) {
    Report.open(interaction, { messageLink: interaction.targetMessage.url });
  }
};

export default { data, execute };
