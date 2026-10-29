import "dotenv/config";

import * as Discord from "discord.js";
import * as Errors from "@/core/errors";
import * as Commands from "@/commands/index";
import * as Time from "@/libs/time";

const { TOKEN, CLIENT, GUILD } = process.env;

const intents = [Discord.GatewayIntentBits.Guilds];
const Client = new Discord.Client({ intents });

Client.commands = new Discord.Collection();

const reducer = (acc, [key, command]) => {
  const { data, execute } = command;
  if (data && execute) return [...acc, data.toJSON()];
  Errors.command(key);
  return acc;
};

const commands = Object.entries(Commands).reduce(reducer, []);

// Guild commands never show up in DMs, so commands usable there are registered globally
const dm = ({ contexts = [] }) => contexts.includes(Discord.InteractionContextType.BotDM);

const direct = commands.filter(dm);
const guild = commands.filter((command) => !dm(command));

const rest = new Discord.REST().setToken(TOKEN);

(async () => {
  try {
    console.log(`${Time.stamp()} Started refreshing ${commands.length} application (/) commands.`);

    const local = await rest.put(Discord.Routes.applicationGuildCommands(CLIENT, GUILD), { body: guild });
    const global = await rest.put(Discord.Routes.applicationCommands(CLIENT), { body: direct });

    console.log(`${Time.stamp()} Successfully reloaded ${local.length + global.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
