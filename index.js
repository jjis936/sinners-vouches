const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Create the vouch panel")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.once("ready", async () => {
  console.log(`✅ ${client.user.tag} is online!`);

  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("✅ Commands loaded!");
});

client.on("interactionCreate", async (interaction) => {

  // /panel command
  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "panel") {

      const embed = new EmbedBuilder()
        .setTitle("📝 Leave a Vouch")
        .setDescription(
          "Thank you for choosing **Sinner Services**!\n\n" +
          "Click the button below to leave your review.\n\n" +
          "⭐ Rating (1-5)\n" +
          "💬 Feedback\n" +
          "🎮 Service Used"
        )
        .setFooter({
          text: "Sinner Services • Vouch System"
        });

      const button = new ButtonBuilder()
        .setCustomId("leave_vouch")
        .setLabel("📝 Leave a Vouch")
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder()
        .addComponents(button);

      await interaction.reply({
        embeds: [embed],
        components: [row]
      });
    }
  }


  // Button clicked
  if (interaction.isButton()) {

    if (interaction.customId === "leave_vouch") {

      const modal = new ModalBuilder()
        .setCustomId("vouch_form")
        .setTitle("Leave a Vouch");

      const rating = new TextInputBuilder()
        .setCustomId("rating")
        .setLabel("⭐ Rating (1-5)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      const feedback = new TextInputBuilder()
        .setCustomId("feedback")
        .setLabel("💬 Your Feedback")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

      const service = new TextInputBuilder()
        .setCustomId("service")
        .setLabel("🎮 Service Used")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

      modal.addComponents(
        new ActionRowBuilder().addComponents(rating),
        new ActionRowBuilder().addComponents(feedback),
        new ActionRowBuilder().addComponents(service)
      );

      await interaction.showModal(modal);
    }
  }


  // Form submitted
  if (interaction.isModalSubmit()) {

    if (interaction.customId === "vouch_form") {

      const rating = interaction.fields.getTextInputValue("rating");
      const feedback = interaction.fields.getTextInputValue("feedback");
      const service = interaction.fields.getTextInputValue("service");

      const embed = new EmbedBuilder()
        .setTitle("⭐ New Vouch Received")
        .addFields(
          {
            name: "⭐ Rating",
            value: `${rating}/5`
          },
          {
            name: "💬 Feedback",
            value: feedback
          },
          {
            name: "🎮 Service",
            value: service
          },
          {
            name: "👤 Customer",
            value: `${interaction.user}`
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Sinner Services"
        });

      await interaction.reply({
        content: "✅ Your vouch has been submitted!",
        ephemeral: true
      });

      await interaction.channel.send({
        embeds: [embed]
      });
    }
  }

});

client.login(process.env.TOKEN);
