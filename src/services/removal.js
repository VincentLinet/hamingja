import * as Removal from "@/templates/removal";

const { LOG_MESSAGES } = process.env;

export const execute = async (message) => {
  if (message.author?.bot) return;
  if (!message.guild) return;

  const channel = message.guild.channels.cache.get(LOG_MESSAGES);
  if (!channel) return;

  await channel.send(Removal.message(message));
};
