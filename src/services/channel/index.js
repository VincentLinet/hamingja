const { TRAP } = process.env;

export const trap = (message) => {
  const { channelId, deletable, member = {} } = message;
  const { bannable } = member;

  if (channelId != TRAP) return;
  if (deletable) message.delete();
  if (bannable) member.ban({ deleteMessageSeconds: 60 * 3, reason: "Fell in the bot trap (Shame 🫵)." });
};
