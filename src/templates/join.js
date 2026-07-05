import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const INVITE = process.env.INVITE;

const color = 0x2ecc71;

export const message = (member, invite = null) => {
  const { displayName, user } = member;
  const { username, id, createdAt: created } = user;

  const now = new Date();
  const author = { name: displayName, icon_url: user.displayAvatarURL() };

  const invites = invite
    ? [
        {
          name: "Invite link",
          value: invite.code === INVITE ? `${INVITE} (Officiel)` : invite.code,
          inline: false,
        },
        {
          name: "Invited by",
          value: invite.inviter ? `<@${invite.inviter.id}>` : "Unknown",
          inline: false,
        },
      ]
    : [];

  return Message.build({
    color,
    author,
    footer: { text: "Join" },
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
        value: `<t:${Time.standardize(now)}:F> (<t:${Time.standardize(now)}:R>)`,
        inline: false,
      },
      ...invites,
    ],
  });
};
