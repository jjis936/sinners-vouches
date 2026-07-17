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
            subject = "⚔️ Warzone Rank Boost";
        }


        if(choice === "multiplayer"){
            subject = "🔥 Multiplayer Rank Boost";
        }



        const existing = interaction.guild.channels.cache.find(

            channel =>

            channel.name ===

            `support-${interaction.user.username.toLowerCase()}`

        );



        if(existing){

            return interaction.reply({

                content:
                "❌ You already have an open ticket.",

                ephemeral:true

            });

        }




        const channel = await interaction.guild.channels.create({


            name:

            `support-${interaction.user.username}`.toLowerCase(),


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


        .setTitle("💎 Sinner Services Order Setup")


        .setDescription(`

👤 **Customer**

${interaction.user}



🎯 **Selected Service**

${subject}



━━━━━━━━━━━━━━━━━━


Please select what you need below.


🏆 Rank Boost?

☢ Nukes?

🎨 Camos?

⚡ Priority Service?



A staff member will help finalize your order.


`)


        .setFooter({

            text:"Sinner Services"

        })


        .setTimestamp();






        const rankYes = new ButtonBuilder()

        .setCustomId("rank_yes")

        .setLabel("🏆 Rank YES")

        .setStyle(ButtonStyle.Success);



        const rankNo = new ButtonBuilder()

        .setCustomId("rank_no")

        .setLabel("🏆 Rank NO")

        .setStyle(ButtonStyle.Danger);





        const nukeYes = new ButtonBuilder()

        .setCustomId("nuke_yes")

        .setLabel("☢ Nukes YES")

        .setStyle(ButtonStyle.Success);



        const nukeNo = new ButtonBuilder()

        .setCustomId("nuke_no")

        .setLabel("☢ Nukes NO")

        .setStyle(ButtonStyle.Danger);





        const row1 = new ActionRowBuilder()

        .addComponents(

            rankYes,

            rankNo,

            nukeYes,

            nukeNo

        );






        const camoYes = new ButtonBuilder()

        .setCustomId("camo_yes")

        .setLabel("🎨 Camos YES")

        .setStyle(ButtonStyle.Success);



        const priorityYes = new ButtonBuilder()

        .setCustomId("priority_yes")

        .setLabel("⚡ Priority YES")

        .setStyle(ButtonStyle.Primary);



        const close = new ButtonBuilder()

        .setCustomId("close_ticket")

        .setLabel("🔒 Close")

        .setStyle(ButtonStyle.Danger);





        const row2 = new ActionRowBuilder()

        .addComponents(

            camoYes,

            priorityYes,

            close

        );







        await channel.send({


            content:`${interaction.user}`,


            embeds:[embed],


            components:[

                row1,

                row2

            ]


        });







        await interaction.reply({


            content:

            `✅ Ticket created: ${channel}`,

            ephemeral:true


        });



    }


};
