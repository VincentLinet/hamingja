import * as Message from "@/services/message";
import * as Time from "@/libs/time";

const color = 0xe67e22;

export const message = (reporter, anonymous, mention, link, content) => {
  const now = new Date();
  const author = anonymous
    ? { name: "Anonymous" }
    : { name: reporter.username, icon_url: reporter.displayAvatarURL() };

  const fields = [
    {
      name: "Reported by",
      value: anonymous ? "Anonymous" : `<@${reporter.id}>`,
      inline: false,
    },
  ];

  if (mention) fields.push({ name: "Reported user", value: mention, inline: false });
  if (link) fields.push({ name: "Message", value: link, inline: false });
  if (content) fields.push({ name: "Complaint", value: content, inline: false });

  fields.push({
    name: "Reported on",
    value: `<t:${Time.standardize(now)}:F> (<t:${Time.standardize(now)}:R>)`,
    inline: false,
  });

  return Message.build({
    color,
    author,
    footer: { text: "Report 🚨" },
    fields,
  });
};
