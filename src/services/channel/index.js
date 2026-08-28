import * as Removal from "@/templates/removal";

const { TRAP, INVINCIBLES, LOG_MODERATION } = process.env;

export const trap = (message) => {
  const { channelId, deletable, member = {}, guild } = message;
  const { bannable } = member;

  if (channelId != TRAP) return;

  const { roles } = member;

  const excluded = roles.cache.some(({ id }) => INVINCIBLES.includes(id));

  if (excluded) return;

  if (deletable) message.delete();
  if (bannable) member.ban({ deleteMessageSeconds: 60 * 3, reason: "Fell in the bot trap (Shame 🫵)." });

  const channel = guild?.channels.cache.get(LOG_MODERATION);
  if (channel) channel.send(Removal.moderated(message, "Trap"));
};
