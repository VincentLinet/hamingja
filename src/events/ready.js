import { Events } from "discord.js";
import * as Invites from "@/services/invites";

const name = Events.ClientReady;
const kind = "once";
const execute = async (client) => {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  Invites.collect(client);
};

const event = { name, kind, execute };

export default event;
