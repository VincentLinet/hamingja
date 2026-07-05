import { Events } from "discord.js";
import * as Voice from "@/services/voice";

const name = Events.VoiceStateUpdate;
const kind = "on";

const execute = async (event, follow) => {
  await Voice.execute(event, follow);
};

const event = { name, kind, execute };

export default event;
