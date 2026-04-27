import * as Models from "@/models/user";

export const create = async (id) => {
  return Models.create(id);
};

export const rank = async (id) => {
  return Models.rank(id);
};

export const bulk = async (users) => {
  return Models.bulk(users);
};
