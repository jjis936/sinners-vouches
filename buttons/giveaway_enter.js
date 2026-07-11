const fs = require("fs");
const path = require("path");


const giveawayFile = path.join(
    __dirname,
    "../data/giveaways.json"
);



module.exports = {


    customId: "giveaway_enter",



    async execute(interaction){


        let giveaways = [];


        if(fs.existsSync(giveawayFile)){


            giveaways = JSON.parse(

                fs.readFileSync(
                    giveawayFile
                )

            );


        }



        const giveaway = giveaways.find(

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



        fs.writeFileSync(

            giveawayFile,

            JSON.stringify(

                giveaways,

                null,

                2

            )

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
