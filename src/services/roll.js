export const execute = async (interaction) => {
  const { member, options } = interaction;

  const { value = 20 } = options.get("value") || {};
  const roll = Math.floor(Math.random() * value + 1);

  await interaction.reply(`You rolled a ${roll} !`);
}