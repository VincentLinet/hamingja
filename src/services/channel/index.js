import * as Removal from "@/templates/removal";
import * as Role from "@/services/user/role";
import * as Strings from "@/services/strings";
import * as Locale from "@/services/locale";
import * as Action from "@/messages/hamingja";
import Text from "@/messages/limit";

const { TRAP, LOG_MODERATION, LIMITED } = process.env;

const limited = LIMITED?.split(",") ?? [];
const LIMIT = 300;
const WARNING_LIFETIME = 10_000;
const DISCORD_LIMIT = 2000;

const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];

const split = (text, size) => {
  const parts = [];
  let remaining = text;

  while (remaining.length > size) {
    const found = remaining.lastIndexOf(" ", size);
    const cut = found > 0 ? found : size;
    parts.push(remaining.slice(0, cut));
    remaining = remaining.slice(cut).trimStart();
  }

  parts.push(remaining);
  return parts;
};

export const trap = (message) => {
  const { channelId: channel, deletable, member = {}, guild } = message;
  const { bannable } = member;

  if (channel != TRAP) return;
  if (Role.shield(member)) return;

  if (deletable) message.delete();
  if (bannable) member.ban({ deleteMessageSeconds: 60 * 3, reason: "Fell in the bot trap (Shame 🫵)." });

  const log = guild?.channels.cache.get(LOG_MODERATION);
  if (log) log.send(Removal.moderated(message, "Trap"));
};

export const limit = async (message) => {
  const { content, author, member, deletable, channel } = message;

  if (!limited.includes(channel.id)) return;
  if (Role.shield(member)) return;
  if (content.length <= LIMIT) return;

  if (deletable) await message.delete();

  const warning = await channel.send(Strings.inject(Text.warning, { user: author.id, limit: LIMIT }));
  setTimeout(() => warning.delete().catch(() => {}), WARNING_LIFETIME);

  const { Members } = Action.load(Locale.of(channel.id));
  const heading = Strings.inject(Text.heading, { channel: channel.id, length: content.length, limit: LIMIT });
  const dm = await member.createDM();

  await dm.send(`*${pick(Members)}*\n\n${heading}`);
  for (const part of split(content, DISCORD_LIMIT)) await dm.send(part);
};
