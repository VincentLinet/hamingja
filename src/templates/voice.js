import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0x3498db;

export const message = (member, channel, joinedAt) => {
  const { displayName, user } = member;
  const now = new Date();
  const duration = now.getTime() - joinedAt.getTime();

  const author = { name: displayName, icon_url: user.displayAvatarURL() };

  return Message.build({
    color,
    author,
    footer: { text: "Voice Session" },
    fields: [
      { name: "Voice channel", value: channel.name, inline: false },
      { name: "Connected", value: `<t:${Time.standardize(joinedAt)}:F>`, inline: false },
      { name: "Disconnected", value: `<t:${Time.standardize(now)}:F>`, inline: false },
      { name: "Duration", value: Time.format(duration), inline: false },
    ],
  });
};
