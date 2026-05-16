import * as Models from "@/models/user/rank";
import * as Role from "@/services/user/role";
import * as Job from "@/services/user/job";
import * as Strings from "@/services/strings";

import config from "config";

const { FESTIVAL } = process.env;

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
  const { member, guild } = interaction;
  const { channels } = guild;
  const { cache } = channels;
  const { id, announce } = superior;
  const { id: user } = member;

  const channel = cache.get(FESTIVAL);
  await Role.swap(member, rank, id);
  if (id === choice) await Job.chose(interaction);
  const content = Strings.inject(announce.replace("%member", "<@%member>"), { member: user });
  await channel.send({ content });
};
