module.exports = {

    customId: "giveaway_enter",

    async execute(interaction) {

        if (!interaction.client.giveaways) {

            interaction.client.giveaways = [];

        }


        const giveaway = 
        interaction.client.giveaways.find(
            g => g.messageId === interaction.message.id
        );


        if (!giveaway) {

            console.log("Active giveaways:", interaction.client.giveaways);

            return interaction.reply({

                content: "❌ Giveaway not found. Restart the giveaway after restarting the bot.",

                ephemeral: true

            });

        }



        if (giveaway.ended) {

            return interaction.reply({

                content: "❌ This giveaway has ended.",

                ephemeral: true

            });

        }



        if (giveaway.entries.includes(interaction.user.id)) {

            return interaction.reply({

                content: "❌ You already entered!",

                ephemeral: true

            });

        }



        giveaway.entries.push(interaction.user.id);



        await interaction.reply({

            content: "🎉 You entered the giveaway!",

            ephemeral: true

        });



        const embed = interaction.message.embeds[0].data;


        embed.description = embed.description.replace(

            /👥 \*\*Entries\*\*\n\d+/,

            `👥 **Entries**\n${giveaway.entries.length}`

        );



        await interaction.message.edit({

            embeds: [embed]

        });


    }

};
