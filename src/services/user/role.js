export const add = (member, role) => {
  console.log({ member, role });
  member.roles.add(role);
};

export const remove = (member, role) => {
  member.roles.remove(role);
};

export const swap = (member, removal, addition) => {
  const removed = Array.isArray(removal) ? removal.filter((role) => role !== addition) : removal;
  remove(member, removed);
  add(member, addition);
};
