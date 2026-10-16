import * as Rank from "@/services/user/rank";
import * as Job from "@/services/user/job";

export const ranks = async () => Rank.list();

export const jobs = async () => Job.list("english");

const tier = (ranks, member) => ranks.findIndex(({ id }) => member.roles.cache.has(id));

export const cumulative = (ranks, member, pools) => {
  const cursor = tier(ranks, member);
  if (cursor === -1) return [];
  const titles = ranks.slice(0, cursor + 1).map(({ title }) => title);
  return titles.flatMap((title) => pools.Ranks?.find((rank) => rank.title === title)?.actions ?? []);
};

export const current = (ranks, member, pools) => {
  const cursor = tier(ranks, member);
  if (cursor === -1) return [];
  return pools.Ranks?.find((rank) => rank.title === ranks[cursor].title)?.actions ?? [];
};

export const assigned = (jobs, member, pools) => {
  const current = jobs.find(({ id }) => member.roles.cache.has(id));
  if (!current) return [];
  return pools.Classes?.find((entry) => entry.title === current.title)?.actions ?? [];
};

const candidates = (guild, ids, exclude) =>
  ids.flatMap((id) => [...(guild.roles.cache.get(id)?.members.values() ?? [])]).filter(({ id }) => id !== exclude);

const pick = (list) => (list.length ? list[Math.floor(Math.random() * list.length)] : null);

export const higher = (ranks, guild, member) => {
  const cursor = tier(ranks, member);
  const ids = ranks.slice(cursor + 1).map(({ id }) => id);
  return pick(candidates(guild, ids, member.id));
};

export const equal = (ranks, guild, member) => {
  const cursor = tier(ranks, member);
  if (cursor === -1) return null;
  return pick(candidates(guild, [ranks[cursor].id], member.id));
};

export const lower = (ranks, guild, member) => {
  const cursor = tier(ranks, member);
  const ids = ranks.slice(0, Math.max(cursor, 0)).map(({ id }) => id);
  return pick(candidates(guild, ids, member.id));
};

export const anyone = (ranks, guild, member) => {
  const ids = ranks.slice(1).map(({ id }) => id);
  return pick(candidates(guild, ids, member.id));
};

export const classmate = (jobs, guild, member, title) => {
  const match = jobs.find((entry) => entry.title.toLowerCase() === title);
  if (!match) return null;
  return pick(candidates(guild, [match.id], member.id));
};
