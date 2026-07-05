import { AuditLogEvent } from "discord.js";
import * as Ban from "@/templates/ban";
import * as Kick from "@/templates/kick";
import * as Timeout from "@/templates/timeout";

const { LOG_MODERATION } = process.env;

const shieldwall = async (guild, type, user) => {
    const { entries } = await guild.fetchAuditLogs({ limit: 1, type });
    const { executor, reason, changes = [], target = {} } = entries.first() || {};
    if (target.id !== user) return {};
    const { new: seconds = 0 } = changes.find(({key}) => key === "delete_message_seconds") || {};
    return { executor, reason, seconds };
};

export const ban = async (ban) => {
  const { guild, user } = ban;
  const { channels } = guild;
  const channel = channels.cache.get(LOG_MODERATION);
  if (!channel) return;

  const { executor, reason, seconds } = await shieldwall(guild, AuditLogEvent.MemberBanAdd, user.id);
  await channel.send(Ban.message(ban, executor, reason, seconds));
};

export const kick = async (member) => {
  const { guild, user } = member;
  const { channels } = guild;
  const channel = channels.cache.get(LOG_MODERATION);
  if (!channel) return;

  const { executor, reason } = await shieldwall(guild, AuditLogEvent.MemberKick, user.id);
  await channel.send(Kick.message(member, executor, reason));
};

export const lift = async (old, member) => {
  const was = !!old.communicationDisabledUntilTimestamp;
  const still = !!member.communicationDisabledUntilTimestamp;
  if (!was || still) return;

  const { guild, user } = member;
  const { channels } = guild;
  const channel = channels.cache.get(LOG_MODERATION);
  if (!channel) return;

  const { entries } = await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
  const { executor, target = {} } = entries.first() || {};
  const exec = target.id === user.id ? executor : null;
  await channel.send(Timeout.end(member, exec));
};

export const timeout = async (old, member) => {
  const active = !old.communicationDisabledUntilTimestamp;
  const until = member.communicationDisabledUntil;
  if (!active || !until) return;

  const { guild, user } = member;
  const { channels } = guild;
  const channel = channels.cache.get(LOG_MODERATION);
  if (!channel) return;

  const { entries } = await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberUpdate });
  const { executor, reason, target = {} } = entries.first() || {};
  const exec = target.id === user.id ? executor : null;
  await channel.send(Timeout.message(member, exec, reason, until));
};
