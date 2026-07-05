import { Events } from "discord.js";
import * as Join from "@/services/join";

const name = Events.GuildMemberAdd;
const kind = "on";

const execute = async (member) => {
  Join.execute(member);
};

const event = { name, kind, execute };

export default event;
