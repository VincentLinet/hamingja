import { GuildFeature } from "discord.js";

export const cache = new Map();

const vanity = async (guild) => {
  if (!guild.features.includes(GuildFeature.VanityURL)) return null;
  return guild.fetchVanityData().catch(() => null);
};

const snapshot = async (guild) => {
  const invites = await guild.invites.fetch();
  const uses = new Map(invites.map(({ code, uses }) => [code, uses]));

  const data = await vanity(guild);
  if (data) uses.set(data.code, data.uses);

  return { invites, uses };
};

export const store = async (guild) => {
  const { uses } = await snapshot(guild);
  cache.set(guild.id, uses);
};

export const detect = async (member) => {
  const { guild } = member;
  const before = cache.get(guild.id) ?? new Map();

  const { invites, uses: after } = await snapshot(guild);

  cache.set(guild.id, after);

  const consumed = [...before.keys()].find((code) => !after.has(code));
  if (consumed) return null;

  const code = [...after.keys()].find((key) => (before.get(key) ?? 0) < after.get(key));
  if (!code) return null;

  if (code === guild.vanityURLCode) return { code, inviter: null, vanity: true };

  return invites.get(code) ?? null;
};

export const collect = async (client) => {
  for (const guild of client.guilds.cache.values()) {
    await store(guild).catch(() => null);
  }
};