import * as Discord from "discord.js";
import * as Report from "@/services/report";

const data = new Discord.SlashCommandBuilder()
  .setName("report")
  .setDescription("Submit a report.")
  .setContexts(Discord.InteractionContextType.Guild)
  .addUserOption((option) =>
    option.setName("user").setDescription("User you are reporting").setRequired(false)
  )
  .addStringOption((option) =>
    option.setName("message").setDescription("Link to the message you are reporting").setRequired(false)
  )
  .addBooleanOption((option) =>
    option.setName("anonymous").setDescription("Submit the report anonymously").setRequired(false)
  );

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) Report.open(interaction);
};

export default { data, execute };