import { Events } from "discord.js";
import * as Errors from "@/core/errors";
import * as Report from "@/services/report";
import * as Birthday from "@/services/user/birthday";

const name = Events.InteractionCreate;
const kind = "on";

const available = (interaction) => {
  const command = interaction.isChatInputCommand();
  const autocomplete = interaction.isAutocomplete();
  const user = interaction.isUserContextMenuCommand();
  const message = interaction.isMessageContextMenuCommand();
  return [command, autocomplete, user, message].some(Boolean);
};

const execute = async (interaction) => {
  const { customId: id } = interaction;
  if (interaction.isModalSubmit() && id.startsWith("report")) return Report.submit(interaction);
  if (interaction.isModalSubmit() && id === "birthday") return Birthday.submit(interaction);
  if (!available(interaction)) return;

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
