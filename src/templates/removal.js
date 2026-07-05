import * as Time from "@/libs/time";

export const message = (message) => {
  const { author, member, createdAt, content, guild, channelId, id } = message;

  const displayName = member?.displayName ?? author?.username ?? "Unknown";
  const username = author?.username ?? "unknown";
  const userId = author?.id ?? "unknown";

  const sentAt = createdAt ? `<t:${Time.standardize(createdAt)}:f>` : "unknown";
  const deletedAt = `<t:${Time.standardize(new Date())}:f>`;
  const channelMention = `<#${channelId}>`;

  return [
    `**${displayName}** (${username}|<@${userId}>) **had a message deleted** in ${channelMention} (${deletedAt}).`,
    `**Sent** (${sentAt})`,
    content ?? "*unavailable*",
  ].join("\n");
};
