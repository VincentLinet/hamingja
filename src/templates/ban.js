import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xe74c3c;

export const message = (member, executor, reason, seconds = 0) => {
  const { displayName, user } = member;
  const { username, id, createdAt: created } = user;

  const now = new Date();
  const author = { name: username, icon_url: user.displayAvatarURL() };

  return Message.build({
    color,
    author,
    footer: { text: "Ban 🔨" },
    fields: [
      { name: "Global name", value: username, inline: false },
      { name: "User ID", value: id, inline: false },
      {
        name: "Account created",
        value: `<t:${Time.standardize(created)}:F> (<t:${Time.standardize(created)}:R>)`,
        inline: false,
      },
      {
        name: "Banned on",
        value: `<t:${Time.standardize(now)}:F> (<t:${Time.standardize(now)}:R>)`,
        inline: false,
      },
      {
        name: "Banned by",
        value: executor ? `<@${executor.id}>` : "Unknown",
        inline: false,
      },
      {
        name: "Reason",
        value: reason ?? "No reason provided",
        inline: false,
      },
      {
        name: "Messages deleted",
        value: Time.labels[seconds] ?? `${seconds}s`,
        inline: false,
      },
    ],
  });
};
