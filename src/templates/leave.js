import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xe74c3c;

export const message = (member) => {
  const { displayName, user, joinedAt: joined } = member;
  const { username, id, createdAt: created } = user;

  const now = new Date();
  const author = { name: displayName, icon_url: user.displayAvatarURL() };

  return Message.build({
    color,
    author,
    footer: { text: "Leave" },
    fields: [
      { name: "Global name", value: username, inline: false },
      { name: "User ID", value: id, inline: false },
      {
        name: "Account created",
        value: `<t:${Time.standardize(created)}:F> (<t:${Time.standardize(created)}:R>)`,
        inline: false,
      },
      {
        name: "Joined server",
        value: joined ? `<t:${Time.standardize(joined)}:F> (<t:${Time.standardize(joined)}:R>)` : "unknown",
        inline: false,
      },
      {
        name: "Left server",
        value: `<t:${Time.standardize(now)}:F> (<t:${Time.standardize(now)}:R>)`,
        inline: false,
      }
    ],
  });
};