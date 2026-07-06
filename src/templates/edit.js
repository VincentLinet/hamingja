import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xf39c12;

export const message = (original, updated) => {
  const { member, author, id: messageId, guild, channelId } = updated;
  const displayName = member?.displayName ?? author?.username ?? "Unknown";
  const avatarURL = author?.displayAvatarURL?.();

  const edition = updated.editedAt ?? new Date();
  const elapsed = original.createdAt ? Time.format(edition - original.createdAt) : "unknown";
  const sentAt = original.createdAt ? `<t:${Time.standardize(original.createdAt)}:f>` : "unknown";
  const editedAt = `<t:${Time.standardize(edition)}:f>`;
  const messageUrl = `https://discord.com/channels/${guild.id}/${channelId}/${messageId}`;

  const embed = avatarURL ? { name: displayName, icon_url: avatarURL } : { name: displayName };

  return Message.build({
    color,
    author: embed,
    footer: { text: "Message Edited" },
    fields: [
      { name: "Channel", value: `<#${channelId}>`, inline: false },
      { name: "Sent", value: sentAt, inline: true },
      { name: "Edited", value: editedAt, inline: true },
      { name: "Elapsed", value: elapsed, inline: true },
      { name: "Original", value: original.content ?? "*unavailable*", inline: false },
      { name: "Updated", value: `[View message](${messageUrl})\n${updated.content}`, inline: false },
    ],
  });
};
