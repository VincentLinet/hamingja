import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xe74c3c;

const build = (message, extraFields = []) => {
  const { author, member, createdAt, content, channelId } = message;
  const displayName = member?.displayName ?? author?.username ?? "Unknown";
  const avatarURL = author?.displayAvatarURL?.();

  const sentAt = createdAt ? `<t:${Time.standardize(createdAt)}:f>` : "unknown";
  const deletedAt = `<t:${Time.standardize(new Date())}:f>`;

  const authorEmbed = avatarURL ? { name: displayName, icon_url: avatarURL } : { name: displayName };

  return Message.build({
    color,
    author: authorEmbed,
    footer: { text: "Message Deleted" },
    fields: [
      { name: "Channel", value: `<#${channelId}>`, inline: false },
      { name: "Sent", value: sentAt, inline: true },
      { name: "Deleted", value: deletedAt, inline: true },
      ...extraFields,
      { name: "Content", value: content ?? "*unavailable*", inline: false },
    ],
  });
};

export const self = (message) => build(message);

export const moderated = (message, deleterName) =>
  build(message, [{ name: "Deleted by", value: deleterName, inline: false }]);
