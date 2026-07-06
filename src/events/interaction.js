import { Events } from "discord.js";
import * as Errors from "@/core/errors";
import * as Report from "@/services/report";

const name = Events.InteractionCreate;
const kind = "on";

const execute = async (interaction) => {
  if (interaction.isModalSubmit() && interaction.customId.startsWith("report")) return Report.submit(interaction);
  if (!interaction.isChatInputCommand() && !interaction.isAutocomplete() && !interaction.isUserContextMenuCommand() && !interaction.isMessageContextMenuCommand()) return;

  const { client, commandName: name } = interaction;

  const command = client.commands.get(name);

  if (!command) return Errors.error(`No command matching ${name} was found.`);

  try {
    command.execute(interaction);
  } catch (error) {
    Errors.error(`Error executing ${name}`);
    Errors.error(error);
  }
};

const event = { name, kind, execute };

export default event;
