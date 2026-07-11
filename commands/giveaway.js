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

        .addStringOption(option =>
            option
                .setName("duration")
                .setDescription("Example: 1h, 24h, 7d")
                .setRequired(true)
        ),


    async execute(interaction) {


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


        const duration =
        interaction.options.getString("duration");


        const embed = new EmbedBuilder()

        .setColor("#B30000")

        .setTitle("🎉 Sinner Services Giveaway")

        .setDescription(
`
🎁 **Prize**
${prize}

⏰ **Ends**
${duration}

👥 **Entries**
0

━━━━━━━━━━━━━━

Click the button below to enter!
`
        )

        .setFooter({
            text:"Sinner Services • Giveaway"
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



        await interaction.channel.send({

            embeds:[embed],

            components:[row]

        });



        await interaction.reply({

            content:
            "✅ Giveaway created!",

            ephemeral:true

        });


    }

};
