import * as Discord from "discord.js";
import * as Canvas from "@napi-rs/canvas";

import * as Errors from "@/core/errors";
import * as Commands from "@/commands";
import * as Events from "@/events";

const { GatewayIntentBits } = Discord;
const { Guilds, GuildMessages, MessageContent } = GatewayIntentBits;
const { GlobalFonts } = Canvas;

GlobalFonts.registerFromPath("assets/fonts/NotoSans-Regular.ttf", "NotoSans");
GlobalFonts.registerFromPath("assets/fonts/NotoSans-Bold.ttf", "NotoSansBold");
GlobalFonts.registerFromPath("assets/fonts/NotoSans-ExtraBold.ttf", "NotoSansExtraBold");

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
