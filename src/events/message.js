import { Events } from "discord.js";
import * as Experience from "@/services/user/experience";
import * as Channel from "@/services/channel";

const name = Events.MessageCreate;
const kind = "on";

const execute = async (interaction) => {
  Experience.attribute(interaction);
  Channel.trap(interaction);
};

const event = { name, kind, execute };

export default event;
