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
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages
  ]
});

const commands = [
  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Create the Sinner Services vouch panel")
    .toJSON()
];

const rest = new REST({ version: "10" })
.setToken(process.env.TOKEN);


client.once("ready", async () => {

  console.log(`✅ ${client.user.tag} is online`);

  await rest.put(
    Routes.applicationCommands(client.user.id),
    {
      body: commands
    }
  );

  console.log("✅ Commands loaded");

});


client.on("interactionCreate", async interaction => {


  if (interaction.isChatInputCommand()) {

    if (interaction.commandName === "panel") {


      const embed = new EmbedBuilder()

      .setTitle("📝 Leave a Vouch")

      .setDescription(
`Thank you for choosing **Sinner Services**!

Click the button below to leave your review.

⭐ Rating (1-5)
💬 Feedback
🎮 Service Used

Your vouch helps us improve!`
      )

      .setFooter({
        text:"Sinner Services • Vouch System"
      });


      const button = new ButtonBuilder()

      .setCustomId("leave_vouch")

      .setLabel("📝 Leave a Vouch")

      .setStyle(ButtonStyle.Primary);



      await interaction.reply({

        embeds:[embed],

        components:[

          new ActionRowBuilder()
          .addComponents(button)

        ]

      });

    }

  }



  if (interaction.isButton()) {


    if (interaction.customId === "leave_vouch") {


      const modal = new ModalBuilder()

      .setCustomId("vouch_form")

      .setTitle("Sinner Services Vouch");


      const rating = new TextInputBuilder()

      .setCustomId("rating")

      .setLabel("⭐ Rating (1-5)")

      .setStyle(TextInputStyle.Short)

      .setRequired(true);



      const feedback = new TextInputBuilder()

      .setCustomId("feedback")

      .setLabel("💬 Feedback")

      .setStyle(TextInputStyle.Paragraph)

      .setRequired(true);



      const service = new TextInputBuilder()

      .setCustomId("service")

      .setLabel("🎮 Service Used")

      .setStyle(TextInputStyle.Short)

      .setRequired(true);



      modal.addComponents(

        new ActionRowBuilder()
        .addComponents(rating),

        new ActionRowBuilder()
        .addComponents(feedback),

        new ActionRowBuilder()
        .addComponents(service)

      );


      await interaction.showModal(modal);

    }

  }



  if (interaction.isModalSubmit()) {


    if (interaction.customId === "vouch_form") {


      let rating =
      Number(
        interaction.fields.getTextInputValue("rating")
      );


      if (rating < 1) rating = 1;
      if (rating > 5) rating = 5;



      const stars =
      "⭐".repeat(rating);



      const feedback =
      interaction.fields.getTextInputValue("feedback");


      const service =
      interaction.fields.getTextInputValue("service");



      const embed = new EmbedBuilder()

      .setTitle("⭐ New Vouch Received")

      .addFields(

        {
          name:"⭐ Rating",
          value:stars
        },

        {
          name:"💬 Feedback",
          value:feedback
        },

        {
          name:"🎮 Service",
          value:service
        },

        {
          name:"👤 Customer",
          value:`${interaction.user}`
        }

      )

      .setTimestamp()

      .setFooter({
        text:"Sinner Services"
      });



      await interaction.reply({

        content:"✅ Your vouch has been submitted!",

        ephemeral:true

      });



      await interaction.channel.send({

        embeds:[embed]

      });


    }

  }


});


client.login(process.env.TOKEN);
