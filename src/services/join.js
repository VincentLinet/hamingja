import * as Join from "@/templates/join";
import * as Invites from "@/services/invites";

const { LOG_JOIN } = process.env;

export const execute = async (member) => {
  const { guild } = member;
    const { channels, members } = guild;
  const { cache } = channels;
  const channel = channels.cache.get(LOG_JOIN);
  if (!channel) return;

  const invite = await Invites.detect(member).catch(() => null);
  const inviter = invite?.inviter
    ? await members.fetch(invite.inviter.id).catch(() => null)
    : null;

  await channel.send(Join.message(member, invite, inviter));
};
