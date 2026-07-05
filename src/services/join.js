import * as Join from "@/templates/join";
import * as Invites from "@/services/invites";

const { LOG_JOIN } = process.env;

export const execute = async (member) => {
  const { guild } = member;
  const { channels } = guild;
  const { cache } = channels;
  const channel = cache.get(LOG_JOIN);
  if (!channel) return;

  const invite = await Invites.detect(member).catch(() => null);
  await channel.send(Join.message(member, invite));
};
