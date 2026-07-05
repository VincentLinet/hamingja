import * as Edit from "@/templates/edit";

const { LOG_MESSAGES } = process.env;

export const execute = async (message, update) => {
  if (!update.editedAt) return;
  if (update.author?.bot) return;
  if (!update.guild) return;

  const channel = update.guild.channels.cache.get(LOG_MESSAGES);
  if (!channel) return;

  await channel.send(Edit.message(message, update));
};
