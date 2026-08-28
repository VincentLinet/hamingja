import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xf39c12;

export const message = (original, updated) => {
  const { member, author, id: messageId, guild, channelId, attachments } = updated;
  const displayName = member?.displayName ?? author?.username ?? "Unknown";
  const avatarURL = author?.displayAvatarURL?.();

  const edition = updated.editedAt ?? new Date();
  const elapsed = original.createdAt ? Time.format(edition - original.createdAt) : "unknown";
  const sentAt = original.createdAt ? `<t:${Time.standardize(original.createdAt)}:f>` : "unknown";
  const editedAt = `<t:${Time.standardize(edition)}:f>`;
  const messageUrl = `https://discord.com/channels/${guild.id}/${channelId}/${messageId}`;
  const fallback = `Text too long. [View message](${messageUrl})`;

  const embed = avatarURL ? { name: displayName, icon_url: avatarURL } : { name: displayName };
  const attachmentField = Message.attachmentsField(attachments);

  return Message.build({
    color,
    author: embed,
    image: Message.attachmentsPreview(attachments),
    footer: { text: "Message Edited" },
    fields: [
      { name: "Channel", value: `<#${channelId}>`, inline: false },
      { name: "Sent", value: sentAt, inline: true },
      { name: "Edited", value: editedAt, inline: true },
      { name: "Elapsed", value: elapsed, inline: true },
      { name: "Original", value: Message.field(original.content ?? "*unavailable*", fallback), inline: false },
      { name: "Updated", value: Message.field(`[View message](${messageUrl})\n${updated.content}`, fallback), inline: false },
      ...(attachmentField ? [attachmentField] : []),
    ],
  });
};
