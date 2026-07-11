const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("giveaway")
        .setDescription("Create a giveaway")

        .addStringOption(option =>
            option
                .setName("prize")
                .setDescription("Giveaway prize")
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option
                .setName("minutes")
                .setDescription("How many minutes until it ends")
                .setRequired(true)
        ),



    async execute(interaction){


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageGuild
            )
        ){

            return interaction.reply({

                content:
                "❌ You need Manage Server permission.",

                ephemeral:true

            });

        }



        const prize =
        interaction.options.getString("prize");


        const minutes =
        interaction.options.getInteger("minutes");



        const endTime =
        Date.now() + (minutes * 60000);



        const embed =
        new EmbedBuilder()

        .setColor("#B30000")

        .setTitle("🎉 Sinner Services Giveaway")

        .setDescription(
`
🎁 **Prize**
${prize}

⏰ **Ends**
<t:${Math.floor(endTime / 1000)}:R>

👥 **Entries**
0

━━━━━━━━━━━━━━

Click below to enter!
`
        )

        .setFooter({

            text:"Sinner Services"

        })

        .setTimestamp();



        const button =
        new ButtonBuilder()

        .setCustomId("giveaway_enter")

        .setLabel("🎉 Enter Giveaway")

        .setStyle(ButtonStyle.Danger);



        const row =
        new ActionRowBuilder()

        .addComponents(button);



        const message =
        await interaction.channel.send({

            embeds:[embed],

            components:[row]

        });



        // Store giveaway in bot memory

        if(!interaction.client.giveaways){

            interaction.client.giveaways = [];

        }



        interaction.client.giveaways.push({

            messageId: message.id,

            channelId: interaction.channel.id,

            guildId: interaction.guild.id,

            prize: prize,

            endTime: endTime,

            entries: [],

            ended:false

        });



        await interaction.reply({

            content:
            "✅ Giveaway created!",

            ephemeral:true

        });


    }

};
