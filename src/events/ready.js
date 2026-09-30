import { Events } from "discord.js";
import * as Invites from "@/services/invites";

const name = Events.ClientReady;
const kind = "once";
const execute = async (client) => {
  console.log(`[${new Date().toISOString().slice(0, 19)}] Ready! Logged in as ${client.user.tag}`);

  Invites.collect(client);
};

const event = { name, kind, execute };

export default event;
