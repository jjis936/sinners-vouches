module.exports = {

    customId: "giveaway_enter",

    async execute(interaction) {


        if (!interaction.client.giveaways) {

            interaction.client.giveaways = new Map();

        }



        const giveaway =
        interaction.client.giveaways.get(
            interaction.message.id
        );



        if (!giveaway) {

            return interaction.reply({

                content:
                "❌ This giveaway is no longer active.",

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
                "❌ You already entered this giveaway!",

                ephemeral:true

            });


        }



        giveaway.entries.push(
            interaction.user.id
        );



        await interaction.reply({

            content:
            "🎉 You entered the giveaway! Good luck 💜",

            ephemeral:true

        });



        const oldEmbed =
        interaction.message.embeds[0];



        const newEmbed =
        oldEmbed.toJSON();



        newEmbed.description =
        newEmbed.description.replace(

            /👥 \*\*Entries\*\*\n>?\s*\d+/,

            `👥 **Entries**\n> ${giveaway.entries.length}`

        );



        await interaction.message.edit({

            embeds:[
                newEmbed
            ]

        });


    }

};
