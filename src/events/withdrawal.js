import { Events } from "discord.js";
import * as Withdrawal from "@/services/withdrawal";

const name = Events.GuildMemberRemove;
const kind = "on";

const execute = async (member) => {
  await Withdrawal.execute(member)
};

const event = { name, kind, execute };

export default event;
