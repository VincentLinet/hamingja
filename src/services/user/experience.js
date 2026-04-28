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

  const { id: candidate } = await Rank.floor(stated);

  if (candidate !== rank) await Rank.promote(interaction, rank, candidate);
};

export const history = async (interaction) => {
  const { guild } = interaction;
  const { channels } = guild;
  const { cache } = channels;

  const start = Date.now();

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

    console.log(`Channel ${name} processed.`);
  }

  const users = Array.from(map.entries());

  await User.bulk(users);

  const duration = Time.format(Date.now() - start);

  interaction.editReply(`Message history catch-up complete in ${duration}. The saga has been recorded.`);
};

export const promote = async (interaction) => {
  const { client, guild } = interaction;
  const { members } = guild;

  const start = Date.now();

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
      console.log(`Member not found: ${username} ${id}`);
      continue;
    }

    const { displayName } = member;

    const { id: rank, title } = await Rank.floor(experience);

    const held = ranks.find((rank) => member.roles.cache.has(rank));

    if (held === rank) {
      console.log(`Promotion skipped for ${displayName}: ${rank} to ${held}`);
      continue;
    }

    await Role.swap(member, ranks, rank);

    console.log(`${displayName}'s role updated to ${title}.`);
    await Time.sleep();
  }

  const duration = Time.format(Date.now() - start);

  await interaction.editReply(`Promotion sync complete in ${duration}.`);
};
