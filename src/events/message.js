import { Events, ChannelType } from "discord.js";
import * as Experience from "@/services/user/experience";
import * as Channel from "@/services/channel";
import * as Private from "@/services/private";

const name = Events.MessageCreate;
const kind = "on";

const execute = async (message) => {
  const { channel } = message;
  const { type } = channel;

  if (type === ChannelType.DM) return;
  Experience.attribute(message);
  Channel.trap(message);
};

const event = { name, kind, execute };

export default event;
