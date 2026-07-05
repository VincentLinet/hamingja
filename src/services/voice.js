import * as VoiceLeave from "@/templates/voice";

const { LOG_VOCAL } = process.env;

const sessions = new Map();

export const execute = async (event, follow) => {
  const joined = !event.channelId && follow.channelId;
  const left = event.channelId && !follow.channelId;

  if (joined) return sessions.set(follow.member.id, new Date());

  if (!left) return

  const { member, channel, guild } = event;
  const { channels } = guild;
  const time = sessions.get(member.id);
  sessions.delete(member.id);

  if (!time) return;

  const log = channels.cache.get(LOG_VOCAL);

  if (!log) return;

  await log.send(VoiceLeave.message(member, channel, time));
};
