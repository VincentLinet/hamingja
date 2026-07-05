import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0x9b59b6;

export const end = (member, executor) => {
  const { displayName, user } = member;
  const { username, id } = user;

  const author = { name: displayName, icon_url: user.displayAvatarURL() };

  return Message.build({
    color,
    author,
    footer: { text: "Timeout End" },
    fields: [
      { name: "Global name", value: username, inline: false },
      { name: "User ID", value: id, inline: false },
      {
        name: "Lifted by",
        value: executor ? `<@${executor.id}>` : "Expiration",
        inline: false,
      },
    ],
  });
};

export const message = (member, executor, reason, until) => {
  const { displayName, user } = member;
  const { username, id, createdAt: created } = user;

  const author = { name: displayName, icon_url: user.displayAvatarURL() };

  return Message.build({
    color,
    author,
    footer: { text: "Timeout" },
    fields: [
      { name: "Global name", value: username, inline: false },
      { name: "User ID", value: id, inline: false },
      {
        name: "Account created",
        value: `<t:${Time.standardize(created)}:F> (<t:${Time.standardize(created)}:R>)`,
        inline: false,
      },
      {
        name: "Timed out by",
        value: executor ? `<@${executor.id}>` : "Unknown",
        inline: false,
      },
      {
        name: "Until",
        value: `<t:${Time.standardize(until)}:F> (<t:${Time.standardize(until)}:R>)`,
        inline: false,
      },
      {
        name: "Reason",
        value: reason ?? "No reason provided",
        inline: false,
      },
    ],
  });
};
