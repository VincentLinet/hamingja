import * as Discord from "discord.js";
import * as Canvas from "@napi-rs/canvas";

import * as Models from "@/models/user/rank";
import * as Role from "@/services/user/role";
import * as Job from "@/services/user/job";
import * as Strings from "@/services/strings";
import * as User from "@/services/user";
import * as Experience from "@/services/user/experience";

import config from "config";

const { AttachmentBuilder, MessageFlags } = Discord;

const { FESTIVAL } = process.env;

const { experience } = config;
const { choice } = experience;

const PICTURE = "https://cdn.vincentlinet.fr/bark.jpg";

export const one = async (id) => {
  return Models.one(id);
};

export const list = async () => {
  return Models.list();
};

export const floor = async (current) => {
  return Models.floor(current);
};

export const individual = async (interaction) => {
  const { member, guild } = interaction;
  const { id, roles, displayName } = member;

  const ranks = await list();
  const jobs = await Job.list();

  const cursor = Math.max(
    0,
    ranks.findIndex(({ id }) => roles.cache.has(id))
  );

  const [{ title: rank, ...current }, next] =
    cursor === ranks.length - 1 ? [ranks[cursor], ranks[cursor]] : ranks.slice(cursor, cursor + 2);

  const { title: job, color = "255, 255, 255" } = jobs.find(({ id }) => roles.cache.has(id)) || {};

  const { experience, ...rest } = await User.one(id);
  const leaderboard = await Experience.leaderboard(id);

  const level = current.experience === 0 ? experience : experience - +current.experience;
  const previous = next.experience - current.experience;
  const progress = previous === 0 ? 500 : Math.min(Math.max(Math.ceil((+level / +previous) * 500), 30), 500);
  const text = previous === 0 ? "Max" : `${level} / ${previous} XP`;

  const canvas = Canvas.createCanvas(800, 250);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(PICTURE);

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  // Background
  ctx.fillStyle = "rgba(0, 0, 0, 0.45)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // User avatar
  const avatarURL = interaction.user.displayAvatarURL({
    extension: "png",
    size: 256
  });

  const avatar = await Canvas.loadImage(avatarURL);

  // Circle avatar
  ctx.save();
  ctx.beginPath();
  ctx.arc(125, 125, 80, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avatar, 45, 45, 160, 160);
  ctx.restore();

  // Username
  ctx.fillStyle = "#ffffff";
  ctx.font = "36px NotoSansBold";
  ctx.textAlign = "left";

  ctx.fillText(displayName, 240, 90);

  // Leaderboard
  ctx.font = "36px NotoSans";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "right";

  ctx.fillText(`#${leaderboard}`, 740, 90);

  // Roles
  ctx.font = "28px NotoSans";
  ctx.textAlign = "left";

  // Class
  if (job) {
    ctx.font = "28px NotoSansExtraBold";
    ctx.fillStyle = `rgb(${color})`;

    ctx.fillText(job, 240, 140);
  }

  // Measure width
  const width = job ? ctx.measureText(job + ".").width : 0;

  // Rank
  ctx.font = "28px NotoSans";
  ctx.fillStyle = "#ffffff";

  ctx.fillText(rank, 240 + width, 140);

  // XP background
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.roundRect(240, 170, 500, 30, 15);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // XP progress
  ctx.fillStyle = `rgba(${color}, 0.8)`;
  ctx.beginPath();
  ctx.roundRect(240, 170, progress, 30, 15);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0)";
  ctx.lineWidth = 0.5;
  ctx.stroke();

  // XP text
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "20px Sans";
  ctx.fillText(text, 500, 193);

  // Export image
  const buffer = await canvas.encode("png");

  const attachment = new AttachmentBuilder(buffer, {
    name: "rank.png"
  });

  await interaction.reply({
    files: [attachment],
    flags: MessageFlags.Ephemeral
  });
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
