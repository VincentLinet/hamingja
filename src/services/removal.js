import { AuditLogEvent } from "discord.js";
import * as Removal from "@/templates/removal";

const { LOG_MESSAGES, LOG_MODERATION, INVINCIBLES } = process.env;

const invincibles = INVINCIBLES?.split(",") ?? [];

const analyze = async (message) => {
  const { guild, author } = message;
  try {
    const logs = await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MessageDelete });
    const entry = logs.entries.first();
    if (!entry) return null;
    const { executor, target, createdAt } = entry;
    const isRecent = Date.now() - createdAt.getTime() < 5000;
    if (!isRecent || target.id !== author?.id) return null;
    if (executor.id === author.id) return null;
    return executor;
  } catch {
    return null;
  }
};

export const execute = async (message) => {
  const { author, guild, member } = message;
  if (author?.bot) return;
  if (!guild) return;

  const invincible = member?.roles.cache.some(({ id }) => invincibles.includes(id));
  if (invincible) return;

  const deleter = await analyze(message);

  if (deleter) {
    const channel = guild.channels.cache.get(LOG_MODERATION);
    if (!channel) return;
    const executor = await guild.members.fetch(deleter.id).catch(() => null);
    const deleterName = executor?.displayName ?? deleter.username;
    await channel.send(Removal.moderated(message, deleterName));
  } else {
    const channel = guild.channels.cache.get(LOG_MESSAGES);
    if (!channel) return;
    await channel.send(Removal.self(message));
  }
};