import * as Locale from "@/services/locale";
import Data from "@/messages/rain";

const pick = (lines) => lines[Math.floor(Math.random() * lines.length)];

export const summon = async (interaction) => {
  const { channelId } = interaction;

  await interaction.reply(`*${pick(Data[Locale.of(channelId)])}*`);
};
