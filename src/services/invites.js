export const cache = new Map();

export const store = async ({invites, id}) => {
  const links = await invites.fetch();
  cache.set(id, new Map(links.map(({code, uses}) => [code, uses])));
};

export const detect = async (member) => {
  const { guild } = member;
  const { id, channels, invites } = guild;
  const before = cache.get(id) ?? new Map();

  const after = await invites.fetch();

  cache.set(id, new Map(after.map(({code, uses}) => [code, uses])));

  const consumed = [...before.keys()].find((code) => !after.has(code));
  if (consumed) return null;

  const used = after.find((i) => (before.get(i.code) ?? 0) < i.uses);
  return used ?? null;
};

export const collect = async (client) => {
  for (const guild of client.guilds.cache.values()) {
    await store(guild).catch(() => null);
  }
};