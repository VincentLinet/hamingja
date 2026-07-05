import * as Discord from "discord.js";
import * as Canvas from "@napi-rs/canvas";

import * as Errors from "@/core/errors";
import * as Commands from "@/commands";
import * as Events from "@/events";

const { GatewayIntentBits, Partials } = Discord;
const { Guilds, GuildMembers, GuildMessages, GuildPresences, MessageContent, GuildVoiceStates } = GatewayIntentBits;
const { GlobalFonts } = Canvas;

GlobalFonts.registerFromPath("assets/fonts/NotoSans-Regular.ttf", "NotoSans");
GlobalFonts.registerFromPath("assets/fonts/NotoSans-Bold.ttf", "NotoSansBold");
GlobalFonts.registerFromPath("assets/fonts/NotoSans-ExtraBold.ttf", "NotoSansExtraBold");

const intents = [Guilds, GuildMembers, GuildMessages, GuildPresences, MessageContent, GuildVoiceStates];
const partials = [Partials.Message, Partials.Channel];
const Client = new Discord.Client({ intents, partials });

Client.commands = new Discord.Collection();

const notify = async (error, origin = "unknown") => {
  const user = await Client.users.fetch(process.env.CACTI);
  await user.send(["💥 Bot crashed", `Origin: ${origin}`, "```", String(error?.stack || error), "```"].join("\n"));
};

const errors = [
  { kind: "unhandledRejection", text: "Unhandled Rejection" },
  { kind: "uncaughtException", text: "Uncaught Exception" }
];

errors.forEach(({ kind, text }) => {
  process.on(kind, async (error) => {
    console.error(text, error);
    await notify(error, text);
    process.exit(1);
  });
});

Client.on("shardDisconnect", () => {
  process.exit(1);
});

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
