import * as Action from "@/messages/hamingja";
import * as Locale from "@/services/locale";
import * as Role from "@/services/user/role";

const { CACTI, DEM, AX, MARC, TUGDUAL } = process.env;

const GUESTS = [
  { id: CACTI, pool: "Cacti" },
  { id: DEM, pool: "Dem" },
  { id: AX, pool: "Ax" },
  { id: MARC, pool: "Marc" },
  { id: TUGDUAL, pool: "Tugdual" }
];

const pick = (pool) => pool[Math.floor(Math.random() * pool.length)];

export const answer = async (message) => {
  const { author, mentions, client, member, channelId: channel } = message;
  const { bot, id } = author;
  const { everyone } = mentions;
  const { user } = client;

  if (bot || everyone) return;
  if (!mentions.has(user, { ignoreRepliedUser: true })) return;

  const guest = GUESTS.find((entry) => entry.id === id);

  if (!guest && Role.shield(member)) return;

  const locale = Locale.of(channel);
  const pools = Action.load(locale);

  await message.reply(`*${pick(pools[guest?.pool ?? "Members"])}*`);
};
