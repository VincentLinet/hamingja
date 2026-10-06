import { Events } from "discord.js";
import * as Join from "@/services/join";
import * as Experience from "@/services/user/experience";

const name = Events.GuildMemberAdd;
const kind = "on";

const execute = async (member) => {
  Join.execute(member);
  Experience.restore(member);
};

const event = { name, kind, execute };

export default event;
