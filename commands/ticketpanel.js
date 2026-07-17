const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits
} = require("discord.js");


module.exports = {


    data: new SlashCommandBuilder()

    .setName("ticketpanel")

    .setDescription("Create the ticket panel"),



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



        const embed =

        new EmbedBuilder()

        .setColor("#B30000")

        .setTitle("💎 Sinner Services Support")

        .setDescription(
`
Need help with a service? Open a ticket below and our team will assist you.

━━━━━━━━━━━━━━━━━━

🎯 **Available Services**

🏆 **Champions Quest**
Professional help completing challenges.

⚔️ **Warzone Rank Boost**
Rank progression and leveling support.

🔥 **MP Rank Boost**
Multiplayer progression support.

━━━━━━━━━━━━━━━━━━

Select your service below to create a private ticket.
`
        )

        .setFooter({

            text:
            "Sinner Services"

        })

        .setTimestamp();



        const menu =

        new StringSelectMenuBuilder()

        .setCustomId("ticket_select")

        .setPlaceholder(
            "🎫 Select a service"
        )

        .addOptions([


            {

                label:
                "Champions Quest",

                description:
                "Open a Champions Quest ticket",

                emoji:
                "🏆",

                value:
                "champions"

            },


            {

                label:
                "WZ Rank Boost",

                description:
                "Open a Warzone boost ticket",

                emoji:
                "⚔️",

                value:
                "warzone"

            },


            {

                label:
                "MP Rank Boost",

                description:
                "Open a Multiplayer boost ticket",

                emoji:
                "🔥",

                value:
                "multiplayer"

            }


        ]);



        const row =

        new ActionRowBuilder()

        .addComponents(menu);



        await interaction.channel.send({

            embeds:[embed],

            components:[row]

        });



        await interaction.reply({

            content:
            "✅ Ticket panel created!",

            ephemeral:true

        });



    }


};
