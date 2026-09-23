import * as Edit from "@/templates/edit";
import * as Role from "@/services/user/role";

const { LOG_MESSAGES } = process.env;

export const execute = async (message, update) => {
  const { editedAt, author, guild, member } = update;
  if (!editedAt) return;
  if (author?.bot) return;
  if (!guild) return;
  if (Role.shield(member)) return;

  const channel = guild.channels.cache.get(LOG_MESSAGES);
  if (!channel) return;

  await channel.send(Edit.message(message, update));
};
