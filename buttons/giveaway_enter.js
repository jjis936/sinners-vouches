module.exports = {

    customId: "giveaway_enter",


    async execute(interaction){


        const giveaways =
        interaction.client.giveaways;



        if(!giveaways){

            return interaction.reply({

                content:
                "❌ No active giveaways.",

                ephemeral:true

            });

        }



        const giveaway =
        giveaways.find(

            g => g.messageId === interaction.message.id

        );



        if(!giveaway){


            return interaction.reply({

                content:
                "❌ This giveaway no longer exists.",

                ephemeral:true

            });


        }



        if(giveaway.ended){


            return interaction.reply({

                content:
                "❌ This giveaway has ended.",

                ephemeral:true

            });


        }



        if(

            giveaway.entries.includes(

                interaction.user.id

            )

        ){


            return interaction.reply({

                content:
                "❌ You already entered!",

                ephemeral:true

            });


        }



        giveaway.entries.push(

            interaction.user.id

        );



        await interaction.reply({

            content:
            "🎉 You entered the giveaway!",

            ephemeral:true

        });



        const embed =
        interaction.message.embeds[0].data;



        embed.description =
        embed.description.replace(

            /👥 \*\*Entries\*\*\n\d+/,

            `👥 **Entries**\n${giveaway.entries.length}`

        );



        await interaction.message.edit({

            embeds:[embed]

        });


    }

};
