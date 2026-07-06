import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xe74c3c;

const build = (message, extraFields = []) => {
  const { author, member, createdAt, content, channelId, attachments } = message;
  const displayName = member?.displayName ?? author?.username ?? "Unknown";
  const avatarURL = author?.displayAvatarURL?.();

  const deletion = new Date();
  const elapsed = createdAt ? Time.format(deletion - createdAt) : "unknown";
  const sentAt = createdAt ? `<t:${Time.standardize(createdAt)}:f>` : "unknown";
  const deletedAt = `<t:${Time.standardize(deletion)}:f>`;

  const authorEmbed = avatarURL ? { name: displayName, icon_url: avatarURL } : { name: displayName };
  const attachmentField = Message.attachmentsField(attachments);

  return Message.build({
    color,
    author: authorEmbed,
    image: Message.attachmentsPreview(attachments),
    footer: { text: "Message Deleted" },
    fields: [
      { name: "Channel", value: `<#${channelId}>`, inline: false },
      { name: "Sent", value: sentAt, inline: true },
      { name: "Deleted", value: deletedAt, inline: true },
      { name: "Elapsed", value: elapsed, inline: true },
      ...extraFields,
      { name: "Content", value: content ?? "*unavailable*", inline: false },
      ...(attachmentField ? [attachmentField] : []),
    ],
  });
};

export const self = (message) => build(message);

export const moderated = (message, deleterName) =>
  build(message, [{ name: "Deleted by", value: deleterName, inline: false }]);
