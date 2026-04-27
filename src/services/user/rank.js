import * as Models from "@/models/user/rank";
import * as Role from "@/services/user/role";
import * as Job from "@/services/user/job";

import config from "config";

const { experience } = config;
const { choice } = experience;

export const one = async (id) => {
  return Models.one(id);
};

export const list = async () => {
  return Models.list();
};

export const floor = async (current) => {
  return Models.floor(current);
};

export const promote = async (interaction, rank, superior) => {
  const { member } = interaction;
  await Role.swap(member, rank, superior);
  if (superior === choice) await Job.chose(interaction);
};
