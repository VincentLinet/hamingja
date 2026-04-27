import * as Discord from "discord.js";
import * as Errors from "@/core/errors";
import * as Commands from "@/commands";
import * as Events from "@/events";

const { GatewayIntentBits } = Discord;
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;

const intents = [Guilds, GuildMessages, MessageContent];
const Client = new Discord.Client({ intents });

Client.commands = new Discord.Collection();

Client.login(process.env.TOKEN);

Object.entries(Commands).forEach(([key, command]) => {
  const { data, execute } = command;
  if (!data || !execute) return Errors.command(key);
  const { name } = data;
  Client.commands.set(name, command);
});

Object.values(Events).forEach(({ name, kind, execute }) => {
  const execution = (...args) => execute(...args);
  Client[kind](name, execution);
});
