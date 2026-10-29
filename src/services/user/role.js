const { INVINCIBLES } = process.env;

const invincibles = INVINCIBLES?.split(",") ?? [];

export const shield = (member) => {
  return member?.roles.cache.some(({ id }) => invincibles.includes(id)) ?? false;
};

export const add = (member, role) => {
  member.roles.add(role);
};

export const remove = (member, role) => {
  member.roles.remove(role);
};

// A single set avoids a concurrent remove overwriting the addition with a stale role list
export const swap = async (member, removal, addition) => {
  const removed = [removal].flat();
  const kept = member.roles.cache.filter(({ id }) => !removed.includes(id) && id !== addition).map(({ id }) => id);
  await member.roles.set([...kept, addition]);
};
