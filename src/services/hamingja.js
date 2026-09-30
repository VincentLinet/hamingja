import * as Action from "@/messages/hamingja";
import * as Locale from "@/services/locale";
import * as Role from "@/services/user/role";

const { CACTI } = process.env;

const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const answer = async (message) => {
  const { author, mentions, client, member, channelId: channel } = message;
  const { bot, id } = author;
  const { everyone } = mentions;
  const { user } = client;

  if (bot || everyone) return;
  if (!mentions.has(user, { ignoreRepliedUser: true })) return;

  const cacti = id === CACTI;

  if (!cacti && Role.shield(member)) return;

  const locale = Locale.of(channel);
  const { Members, Cacti } = Action.load(locale);

  const pool = cacti ? Cacti : Members;

  await message.reply(`*${pick(pool)}*`);
};
