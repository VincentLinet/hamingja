import * as Models from "@/models/user";

export const create = async (id) => {
  return Models.create(id);
};

export const list = async () => {
  return Models.list();
};

export const rank = async (id) => {
  return Models.rank(id);
};

export const bulk = async (users) => {
  return Models.bulk(users);
};
