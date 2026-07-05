import { Events } from "discord.js";
import * as Removal from "@/services/removal";

const name = Events.MessageDelete;
const kind = "on";

const execute = async (message) => {
  await Removal.execute(message);
};

const event = { name, kind, execute };

export default event;
