import * as Time from "@/libs/time";

export const message = (original, updated) => {
  const { member, author, id: messageId, guild, channelId } = updated;
  const displayName = member?.displayName ?? author.username;
  const { username, id } = author;

  const edition = updated.editedAt ?? new Date();
  const elapsed = original.createdAt ? Time.format(edition - original.createdAt) : "unknown";
  const sentAt = original.createdAt ? `<t:${Time.standardize(original.createdAt)}:f>` : "unknown";
  const editedAt = `<t:${Time.standardize(edition)}:f>`;
  const messageUrl = `https://discord.com/channels/${guild.id}/${channelId}/${messageId}`;

  return [
    `**${displayName}** (${username}|<@${id}>) **has edited the message** ${messageUrl} ${elapsed} after sending.`,
    `**Original** (${sentAt})`,
    original.content ?? "*unavailable*",
    `**Updated** (${editedAt})`,
    updated.content,
  ].join("\n");
};
