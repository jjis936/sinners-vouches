const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


module.exports = {


    customId: "ticket_select",



    async execute(interaction){


        const choice =
        interaction.values[0];



        let service = "Unknown";



        if(choice === "champions"){

            service = "🏆 Champions Quest";

        }


        if(choice === "warzone"){

            service = "⚔️ Warzone Rank Boost";

        }


        if(choice === "multiplayer"){

            service = "🔥 MP Rank Boost";

        }



        const existing =

        interaction.guild.channels.cache.find(

            channel =>
            channel.name ===
            `ticket-${interaction.user.username}`

        );



        if(existing){


            return interaction.reply({

                content:
                "❌ You already have an open ticket.",

                ephemeral:true

            });


        }



        const channel =

        await interaction.guild.channels.create({

            name:
            `ticket-${interaction.user.username}`,

            type:
            ChannelType.GuildText,



            permissionOverwrites:[

                {

                    id:
                    interaction.guild.id,

                    deny:[

                        PermissionFlagsBits.ViewChannel

                    ]

                },


                {

                    id:
                    interaction.user.id,

                    allow:[

                        PermissionFlagsBits.ViewChannel,

                        PermissionFlagsBits.SendMessages,

                        PermissionFlagsBits.ReadMessageHistory

                    ]

                }

            ]

        });




        const embed =

        new EmbedBuilder()

        .setColor("#B30000")

        .setTitle("💎 Sinner Services Ticket")

        .setDescription(
`
👤 **Customer**
${interaction.user}

📦 **Service**
${service}

━━━━━━━━━━━━━━━━━━

Please provide:

🎮 Activision ID:
🎯 Current Rank:
🚀 Desired Rank:
📝 Additional Details:

A staff member will assist you shortly.
`
        )

        .setFooter({

            text:
            "Sinner Services"

        })

        .setTimestamp();




        const closeButton =

        new ButtonBuilder()

        .setCustomId("ticket_close")

        .setLabel("🔒 Close Ticket")

        .setStyle(ButtonStyle.Danger);



        const row =

        new ActionRowBuilder()

        .addComponents(closeButton);




        await channel.send({

            content:
            `${interaction.user}`,

            embeds:[embed],

            components:[row]

        });




        await interaction.reply({

            content:
            `✅ Ticket created: ${channel}`,

            ephemeral:true

        });



    }


};
