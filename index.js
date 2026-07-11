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
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const VOUCH_CHANNEL_ID = "1507682259678003371";

const pendingVouches = new Map();

const commands = [
  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Create the vouch panel")
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


  // PANEL

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
📸 Proof Screenshot

Your feedback helps us improve!`
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



  // BUTTON

  if(interaction.isButton()) {


    if(interaction.customId === "leave_vouch") {


      const modal = new ModalBuilder()

      .setCustomId("vouch_form")

      .setTitle("Sinner Services Vouch");



      const rating = new TextInputBuilder()

      .setCustomId("rating")

      .setLabel("⭐ Rating 1-5")

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



  // FORM

  if(interaction.isModalSubmit()) {


    if(interaction.customId === "vouch_form") {


      pendingVouches.set(interaction.user.id, {

        rating:
        interaction.fields.getTextInputValue("rating"),

        feedback:
        interaction.fields.getTextInputValue("feedback"),

        service:
        interaction.fields.getTextInputValue("service")

      });



      await interaction.reply({

        content:
`📸 **Upload your proof screenshot now.**

Send your image/file in this channel.

You have 2 minutes.`,

        ephemeral:true

      });


    }

  }


});




// PROOF UPLOAD

client.on("messageCreate", async message => {


  if(message.author.bot) return;


  const data =
  pendingVouches.get(message.author.id);



  if(!data) return;



  if(message.attachments.size === 0) return;



  const rating =
  Math.min(
    Math.max(Number(data.rating),1),
    5
  );


  const stars =
  "⭐".repeat(rating);



  const image =
  message.attachments.first().url;



  const embed = new EmbedBuilder()

  .setTitle("⭐ New Vouch Received")

  .addFields(

    {
      name:"⭐ Rating",
      value:stars
    },

    {
      name:"💬 Feedback",
      value:data.feedback
    },

    {
      name:"🎮 Service",
      value:data.service
    },

    {
      name:"👤 Customer",
      value:`${message.author}`
    }

  )

  .setImage(image)

  .setTimestamp()

  .setFooter({
    text:"Sinner Services"
  });



  const channel =
  client.channels.cache.get(VOUCH_CHANNEL_ID);



  if(channel){

    await channel.send({

      embeds:[embed]

    });

  }



  pendingVouches.delete(message.author.id);



  await message.reply(
    "✅ Your vouch has been posted! Thank you!"
  );


});



client.login(process.env.TOKEN);
