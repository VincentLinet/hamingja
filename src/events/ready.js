import { Events } from "discord.js";
import * as Invites from "@/services/invites";
import * as Time from "@/libs/time";

const name = Events.ClientReady;
const kind = "once";
const execute = async (client) => {
  console.log(`${Time.stamp()} Ready! Logged in as ${client.user.tag}`);

  Invites.collect(client);
};

const event = { name, kind, execute };

export default event;
