import * as Discord from "discord.js";
import * as Report from "@/templates/report";

const { LOG_REPORTS } = process.env;

export const open = async (interaction, { user, anonymous, message } = {}) => {
  const { options } = interaction;
  const link = message ?? options?.getString("message") ?? "";
  const hidden = anonymous ?? options?.getBoolean("anonymous") ?? false;
  const { id, username } = user ?? options?.getUser("user") ?? {};
  const userId = id ?? "";
  const userName = username ? `@${username}` : "";

  const modal = new Discord.ModalBuilder()
    .setCustomId(`report:${userId}`)
    .setTitle("Report to Shieldwall");

  const reported = new Discord.TextInputBuilder()
    .setCustomId("user")
    .setLabel("Reported user (optional)")
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(false);

  if (userName) reported.setValue(userName);

  const pin = new Discord.TextInputBuilder()
    .setCustomId("link")
    .setLabel("Message link (optional)")
    .setStyle(Discord.TextInputStyle.Short)
    .setRequired(false);

  if (link) pin.setValue(link);

  const complaint = new Discord.TextInputBuilder()
    .setCustomId("complaint")
    .setLabel("Complaint")
    .setStyle(Discord.TextInputStyle.Paragraph)
    .setRequired(false);

  const anonymized = new Discord.StringSelectMenuBuilder()
    .setCustomId("anonymous")
    .setRequired(true)
    .addOptions(
      new Discord.StringSelectMenuOptionBuilder()
        .setLabel("Anonymous")
        .setDescription("Your identity will not be disclosed")
        .setValue("true")
        .setDefault(hidden),
      new Discord.StringSelectMenuOptionBuilder()
        .setLabel("Not anonymous")
        .setDescription("Your name will be visible in the report")
        .setValue("false")
        .setDefault(!hidden)
    );

  const title = new Discord.LabelBuilder()
    .setLabel("Anonymous?")
    .setStringSelectMenuComponent(anonymized);

  modal.addComponents(
    new Discord.ActionRowBuilder().addComponents(reported),
    new Discord.ActionRowBuilder().addComponents(pin),
    new Discord.ActionRowBuilder().addComponents(complaint)
  );

  modal.addLabelComponents(title);

  await interaction.showModal(modal);
};

export const submit = async (interaction) => {
  const { guild, customId, user, fields } = interaction;
  const { channels } = guild ?? {};
  const [, userId] = customId.split(":");

  const text = fields.getTextInputValue("user").trim();
  const link = fields.getTextInputValue("link").trim();
  const complaint = fields.getTextInputValue("complaint").trim();
  const anonymous = fields.getStringSelectValues("anonymous")[0] === "true";

  if (!text && !link && !complaint) {
    return interaction.reply({
      content: "Please provide at least a user, a message link, or a complaint.",
      flags: Discord.MessageFlags.Ephemeral,
    });
  }

  const mention = userId ? `<@${userId}>` : (text || null);

  const channel = channels?.cache.get(LOG_REPORTS);
  if (channel) await channel.send(Report.message(user, anonymous, mention, link || null, complaint || null));

  await interaction.reply({
    content: "Your report has been submitted.",
    flags: Discord.MessageFlags.Ephemeral,
  });
};
