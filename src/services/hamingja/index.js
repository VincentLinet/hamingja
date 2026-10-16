import * as Action from "@/messages/hamingja";
import * as Locale from "@/services/locale";
import * as Role from "@/services/user/role";
import * as Strings from "@/services/strings";
import * as Pool from "@/services/hamingja/pool";

const { CACTI, DEM, AX, MARC, TUGDUAL } = process.env;

const GUESTS = [
  { id: CACTI, pool: "Cacti", ranks: "current" },
  { id: DEM, pool: "Dem", ranks: "current" },
  { id: AX, pool: "Ax" },
  { id: MARC, pool: "Marc" },
  { id: TUGDUAL, pool: "Tugdual" }
];

const TOKEN = /%([a-zÀ-ÿ]+)/gi;

const RESOLVERS = {
  higher: Pool.higher,
  equal: Pool.equal,
  lower: Pool.lower,
  anyone: Pool.anyone
};

const tokens = (text) => [...new Set([...text.matchAll(TOKEN)].map(([, name]) => name.toLowerCase()))];

const resolve = (ranks, jobs, guild, member, name) => {
  const resolver = RESOLVERS[name];
  if (resolver) return resolver(ranks, guild, member);
  return Pool.classmate(jobs, guild, member, name);
};

const eligible = (ranks, jobs, guild, member, line) => {
  const names = tokens(line);
  if (names.length === 0) return { line, injections: {} };

  const found = names.map((name) => resolve(ranks, jobs, guild, member, name));
  if (found.some((candidate) => !candidate)) return null;

  const injections = Object.fromEntries(names.map((name, index) => [name, `**${found[index].displayName}**`]));
  return { line, injections };
};

const pick = (entries) => entries[Math.floor(Math.random() * entries.length)];

export const answer = async (message) => {
  const { author, mentions, client, member, guild, channelId: channel } = message;
  const { bot, id } = author;
  const { everyone } = mentions;
  const { user } = client;

  if (bot || everyone) return;
  if (!mentions.has(user, { ignoreRepliedUser: true })) return;

  const guest = GUESTS.find((entry) => entry.id === id);

  if (!guest && Role.shield(member)) return;

  const locale = Locale.of(channel);
  const pools = Action.load(locale);

  const ranks = await Pool.ranks();
  const jobs = await Pool.jobs();

  const ranked = guest?.ranks === "current" ? Pool.current(ranks, member, pools) : Pool.cumulative(ranks, member, pools);

  const unlocked = [
    ...(guest ? pools[guest.pool] : pools.Members),
    ...ranked,
    ...Pool.assigned(jobs, member, pools)
  ];

  const entries = unlocked.map((line) => eligible(ranks, jobs, guild, member, line)).filter(Boolean);

  if (entries.length === 0) return;

  const { line, injections } = pick(entries);

  await message.reply(`*${Strings.inject(line, injections)}*`);
};
