import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const { INVITE, INVINCIBLES } = process.env;

const invincibles = INVINCIBLES?.split(",") ?? [];

const color = 0x2ecc71;

const invitation = (invite, inviter) => {
  if (invite?.vanity) return "Vanity URL";
  if (!invite?.inviter) return "Unknown";
  const invincible = inviter?.roles.cache.some(({ id }) => invincibles.includes(id));
  return invincible ? (inviter?.displayName ?? invite.inviter.username) : `<@${invite.inviter.id}>`;
};

export const message = (member, invite = null, inviter = null) => {
  const { displayName, user } = member;
  const { username, id, createdAt: created } = user;

  const now = new Date();
  const author = { name: displayName, icon_url: user.displayAvatarURL() };
  const linked = invitation(invite, inviter);

  const invites = invite
    ? [
        {
          name: "Invite link",
          value: invite.code === INVITE ? `${INVITE} (Official)` : invite.code,
          inline: false
        },
        {
          name: "Invited by",
          value: linked,
          inline: false
        }
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
        inline: false
      },
      {
        name: "Joined server",
        value: `<t:${Time.standardize(now)}:F> (<t:${Time.standardize(now)}:R>)`,
        inline: false
      },
      ...invites
    ]
  });
};
