import { AuditLogEvent } from "discord.js";
import * as Leave from "@/templates/leave";
import * as Hammer from "@/services/hammer";

const { LOG_LEAVE } = process.env;

const banned = async (guild, user) => {
  try {
    await guild.bans.fetch(user);
    return true;
  } catch {
    return false;
  }
};

const kicked = async (guild, user) => {
  try {
    const logs = await guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
    const entry = logs.entries.first();
    if (!entry) return false;
    const recent = Date.now() - entry.createdTimestamp < 5000;
    return entry.target?.id === user && recent;
  } catch {
    return false;
  }
};

export const execute = async (member) => {
  const { guild, user } = member;
  const { id } = user;

  if (await banned(guild, id)) return Hammer.ban(member);
  if (await kicked(guild, id)) return Hammer.kick(member);

  const channel = guild.channels.cache.get(LOG_LEAVE);
  if (!channel) return;

  await channel.send(Leave.message(member));
};
