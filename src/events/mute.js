import { Events } from "discord.js";
import * as Hammer from "@/services/hammer";

const name = Events.GuildMemberUpdate;
const kind = "on";

const execute = async (old, member) => {
  await Hammer.timeout(old, member);
  await Hammer.lift(old, member);
};

const event = { name, kind, execute };

export default event;
