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
        .setDescription("Create a Sinner Services giveaway")

        .addStringOption(option =>
            option
                .setName("prize")
                .setDescription("Giveaway prize")
                .setRequired(true)
        )

        .addIntegerOption(option =>
            option
                .setName("minutes")
                .setDescription("Minutes until giveaway ends")
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
        Date.now() + minutes * 60000;



        const embed = new EmbedBuilder()

        .setColor("#b026ff")

        .setTitle("🎉 Sinner Services Giveaway")

        .setDescription(
`
🎁 **Prize**
> ${prize}

⏰ **Ends**
<t:${Math.floor(endTime / 1000)}:R>

👥 **Entries**
> 0

━━━━━━━━━━━━━━━━━━

🔥 Click below to enter!

Good luck everyone 💜
`
        )

        .setFooter({

            text:
            "Sinner Services • Premium Gaming"

        })

        .setTimestamp();



        const button =
        new ButtonBuilder()

        .setCustomId("giveaway_enter")

        .setLabel("🎉 Enter Giveaway")

        .setStyle(ButtonStyle.Primary);



        const row =
        new ActionRowBuilder()

        .addComponents(button);



        const message =
        await interaction.channel.send({

            embeds:[embed],

            components:[row]

        });



        if(!interaction.client.giveaways){

            interaction.client.giveaways = new Map();

        }



        interaction.client.giveaways.set(

            message.id,

            {

                messageId: message.id,

                channelId: interaction.channel.id,

                guildId: interaction.guild.id,

                prize,

                endTime,

                entries: [],

                ended:false

            }

        );



        await interaction.reply({

            content:
            "✅ Giveaway created successfully!",

            ephemeral:true

        });



        // automatic ending timer

        setTimeout(async()=>{


            const giveaway =
            interaction.client.giveaways.get(message.id);



            if(!giveaway || giveaway.ended)
                return;



            giveaway.ended = true;



            const channel =
            interaction.guild.channels.cache.get(
                giveaway.channelId
            );



            if(!channel)
                return;



            let winner = null;



            if(giveaway.entries.length > 0){

                winner =
                giveaway.entries[
                    Math.floor(
                        Math.random() *
                        giveaway.entries.length
                    )
                ];

            }



            const endedEmbed =
            new EmbedBuilder()

            .setColor("#22c55e")

            .setTitle("🎉 GIVEAWAY ENDED")

            .setDescription(
`
🎁 **Prize**
> ${giveaway.prize}


🏆 **Winner**

${
winner
? `<@${winner}>`
: "No valid entries"
}


👥 **Total Entries**
${giveaway.entries.length}


━━━━━━━━━━━━━━━━━━

Thanks for participating 💜
`
            )

            .setFooter({

                text:
                "Sinner Services"

            })

            .setTimestamp();



            try{


                await message.edit({

                    embeds:[endedEmbed],

                    components:[]

                });



            }catch(error){

                console.log(
                    "Could not edit giveaway:",
                    error
                );

            }



            if(winner){

                channel.send({

                    content:
                    `🎊 Congratulations <@${winner}>! You won **${giveaway.prize}**!`

                });

            }
            else{

                channel.send({

                    content:
                    "⚠ Giveaway ended with no valid entries."

                });

            }



        }, minutes * 60000);



    }

};
