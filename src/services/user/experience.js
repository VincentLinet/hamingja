import * as Discord from "discord.js";

import * as Models from "@/models/user/experience";

import * as Time from "@/libs/time";
import * as User from "@/services/user";
import * as Rank from "@/services/user/rank";
import * as Role from "@/services/user/role";
import * as Message from "@/services/message";

import config from "config";

const { experience } = config;

const { MessageFlags } = Discord;

const { IMMORTALS } = process.env;

const image = () => 5;
const emoji = () => 1;
const text = ({ content }) => Math.ceil((content.length + 1) / 10);

const grid = { image, emoji, text };

export const evaluate = (message) => {
  const kind = Message.kind(message);
  const method = grid[kind];
  return method(message);
};

export const increase = (id, growth, cooldown) => {
  return Models.increase(id, growth, cooldown);
};

export const get = (id) => {
  return Models.get(id);
};

export const leaderboard = (id) => {
  return Models.leaderboard(id);
};

export const attribute = async (interaction) => {
  const { author } = interaction;
  const { id, bot } = author;
  const { cooldown } = experience;

  if (bot) return;

  await User.create(id);

  const growth = evaluate(interaction);

  const rank = await User.rank(id);

  await increase(id, growth, cooldown);
  const stated = await get(id);

  const candidate = await Rank.floor(stated);
  const { id: superior } = candidate;

  if (superior !== rank) await Rank.promote(interaction, rank, candidate);
};

export const history = async (interaction) => {
  const { guild, user } = interaction;
  const { channels } = guild;
  const { cache } = channels;

  const start = Date.now();

  console.log(`${Time.stamp()} Scanning message history... this may take a while.`);

  await interaction.reply({
    content: "Scanning message history... this may take a while.",
    flags: MessageFlags.Ephemeral
  });

  const map = new Map();

  const increase = (id, experience) => {
    map.set(id, (map.get(id) || 0) + experience);
  };

  for (const channel of cache.values()) {
    if (!channel.isTextBased()) continue;
    if (!channel.viewable) continue;

    const { name } = channel;

    let id = null;
    let done = false;

    while (!done) {
      const options = id ? { before: id, limit: 100 } : { limit: 100 };

      const messages = await channel.messages.fetch(options);

      if (messages.size === 0) {
        done = true;
        break;
      }

      for (const message of messages.values()) {
        const { author } = message;
        const { id, bot } = author;

        if (bot) continue;

        const experience = evaluate(message);
        increase(id, experience);
      }

      id = messages.last().id;
      await Time.sleep();
    }

    console.log(`${Time.stamp()} Channel ${name} processed.`);
  }

  const users = Array.from(map.entries());

  await User.bulk(users);

  const duration = Time.format(Date.now() - start);

  console.log(`${Time.stamp()} Message history catch-up complete in ${duration}. The saga has been recorded.`);
  user.send(`Message history catch-up complete in ${duration}. The saga has been recorded.`);
};

const align = async (member, experience, ranks) => {
  const { id, displayName } = member;

  const floor = await Rank.floor(experience);
  if (!floor) return false;

  const { id: rank, title } = floor;

  const held = ranks.find((rank) => member.roles.cache.has(rank));

  if (held === rank) return !!console.log(`${Time.stamp()} Promotion skipped for ${displayName}: ${rank} to ${held}`);

  await Role.swap(member, ranks, rank);

  console.log(`${Time.stamp()} ${displayName}'s role updated to ${title}.`);
  return true;
};

export const restore = async (member) => {
  const { id, user } = member;
  if (user.bot) return;

  const stored = await User.one(id);
  if (!stored) return;

  const list = await Rank.list();
  const ranks = list.map(({ id }) => id);

  await align(member, stored.experience, ranks);
};

export const promote = async (interaction) => {
  const { client, guild, user } = interaction;
  const { members } = guild;

  const start = Date.now();

  console.log(`${Time.stamp()} Updating roles from stored experience...`);
  await interaction.reply({
    content: "Updating roles from stored experience...",
    flags: MessageFlags.Ephemeral
  });

  const users = await User.list();

  const list = await Rank.list();
  const ranks = list.map(({ id }) => id);

  for (const { id, experience } of users) {
    const member = members.cache.get(id) ?? (await members.fetch(id).catch(() => null));

    if (!member) {
      const { users } = client;
      const { username } = await users.fetch(id);
      console.log(`${Time.stamp()} Member not found: ${username} ${id}`);
      continue;
    }

    const updated = await align(member, experience, ranks);
    if (updated) await Time.sleep();
  }

  const duration = Time.format(Date.now() - start);

  console.log(`${Time.stamp()} Promotion sync complete in ${duration}.`);
  await user.send(`Promotion sync complete in ${duration}.`);
};
