module.exports = {


    async execute(interaction){


        if(!interaction.client.giveawayEntries){

            interaction.client.giveawayEntries = new Map();

        }



        let entries =
        interaction.client.giveawayEntries.get(
            interaction.message.id
        );



        if(!entries){

            entries = [];

        }



        if(entries.includes(interaction.user.id)){


            return interaction.reply({

                content:
                "❌ You already entered this giveaway!",

                ephemeral:true

            });


        }



        entries.push(
            interaction.user.id
        );



        interaction.client.giveawayEntries.set(

            interaction.message.id,

            entries

        );



        await interaction.reply({

            content:
            "🎉 You entered the giveaway!",

            ephemeral:true

        });



        const embed =
        interaction.message.embeds[0];



        if(embed){


            const newEmbed =
            embed.toJSON();



            newEmbed.description =
            newEmbed.description.replace(

                /👥 \*\*Entries\*\*\n\d+/,

                `👥 **Entries**\n${entries.length}`

            );



            await interaction.message.edit({

                embeds:[newEmbed]

            });


        }


    }


};
