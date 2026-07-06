import * as Edit from "@/templates/edit";

const { LOG_MESSAGES, INVINCIBLES } = process.env;

const invincibles = INVINCIBLES?.split(",") ?? [];

export const execute = async (message, update) => {
  const { editedAt, author, guild, member } = update;
  if (!editedAt) return;
  if (author?.bot) return;
  if (!guild) return;

  const invincible = member?.roles.cache.some(({ id }) => invincibles.includes(id));
  if (invincible) return;

  const channel = guild.channels.cache.get(LOG_MESSAGES);
  if (!channel) return;

  await channel.send(Edit.message(message, update));
};
