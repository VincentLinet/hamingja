import { Events } from "discord.js";
import * as Errors from "@/core/errors";
import * as Report from "@/services/report";
import * as Birthday from "@/services/user/birthday";
import * as Leaderboard from "@/services/user/leaderboard";
import * as Census from "@/services/user/census";

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
  if (interaction.isButton() && id.startsWith("leaderboard:")) return Leaderboard.navigate(interaction);
  if (interaction.isButton() && id.startsWith("classes:")) return Census.browse(interaction);
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
