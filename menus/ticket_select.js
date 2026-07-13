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


        const choice = interaction.values[0];


        let subject = "General Support";


        if(choice === "champions"){

            subject = "🏆 Champions Quest Support";

        }


        if(choice === "warzone"){

            subject = "⚔️ Warzone Support";

        }


        if(choice === "multiplayer"){

            subject = "🔥 Multiplayer Support";

        }




        const existing = interaction.guild.channels.cache.find(

            channel =>

            channel.name ===

            `support-${interaction.user.username.toLowerCase()}`

        );



        if(existing){

            return interaction.reply({

                content:
                "❌ You already have an open support ticket.",

                ephemeral:true

            });

        }






        const channel = await interaction.guild.channels.create({


            name:

            `support-${interaction.user.username}`

            .toLowerCase(),



            type:

            ChannelType.GuildText,



            permissionOverwrites:[


                {

                    id:interaction.guild.id,

                    deny:[

                        PermissionFlagsBits.ViewChannel

                    ]

                },



                {

                    id:interaction.user.id,

                    allow:[

                        PermissionFlagsBits.ViewChannel,

                        PermissionFlagsBits.SendMessages,

                        PermissionFlagsBits.ReadMessageHistory

                    ]

                }


            ]


        });







        const embed = new EmbedBuilder()


        .setColor("#B30000")


        .setTitle("💎 Sinner Services Support")


        .setDescription(`

👤 **Customer**

${interaction.user}



📌 **Reason**

${subject}



━━━━━━━━━━━━━━━━━━


Please explain what you need help with.


A staff member will respond soon.


`)


        .setFooter({

            text:"Sinner Services Support"

        })


        .setTimestamp();








        const close = new ButtonBuilder()


        .setCustomId("ticket_close")


        .setLabel("🔒 Close")


        .setStyle(ButtonStyle.Danger);





        const row = new ActionRowBuilder()

        .addComponents(close);







        await channel.send({

            content:`${interaction.user}`,

            embeds:[embed],

            components:[row]

        });







        await interaction.reply({

            content:

            `✅ Support ticket created: ${channel}`,

            ephemeral:true

        });


    }


};
