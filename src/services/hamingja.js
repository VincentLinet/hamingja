import ACTIONS from "@/messages/hamingja";
import * as Role from "@/services/user/role";

const pick = () => ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

export const answer = async (message) => {
  const { author, mentions, client, member } = message;
  const { bot } = author;
  const { everyone } = mentions;
  const { user } = client;

  if (bot || everyone) return;
  if (!mentions.has(user)) return;
  if (Role.shield(member)) return;

  await message.reply(`*${pick()}*`);
};
