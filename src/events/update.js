import { Events } from "discord.js";
import * as Edit from "@/services/edit";

const name = Events.MessageUpdate;
const kind = "on";

const execute = async (message, update) => {
  if (message.partial) await message.fetch();
  if (update.partial) await update.fetch();
  await Edit.execute(message, update);
};

const event = { name, kind, execute };

export default event;
