import * as Discord from "discord.js";

import * as Birthday from "@/services/user/birthday";

const data = new Discord.SlashCommandBuilder()
  .setName("birthday")
  .setDescription("Manage your birthday.")
  .setContexts(
    Discord.InteractionContextType.Guild,
    Discord.InteractionContextType.BotDM,
    Discord.InteractionContextType.PrivateChannel
  )
  .addSubcommand((subcommand) =>
    subcommand.setName("set").setDescription("Register your birthday so Hamingja can celebrate it.")
  )
  .addSubcommand((subcommand) => subcommand.setName("remove").setDescription("Forget your birthday."))
  .addSubcommand((subcommand) =>
    subcommand.setName("today").setDescription("See who's celebrating their birthday today.")
  )
  .addSubcommand((subcommand) => subcommand.setName("list").setDescription("List every registered birthday."));

const execute = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const subcommand = interaction.options.getSubcommand();

  if (subcommand === "set") return Birthday.open(interaction);
  if (subcommand === "remove") return Birthday.remove(interaction);
  if (subcommand === "today") return Birthday.celebrating(interaction);
  if (subcommand === "list") return Birthday.everyone(interaction);
};

export default { data, execute };
