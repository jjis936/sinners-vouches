const {
    PermissionFlagsBits
} = require("discord.js");


module.exports = {


    customId: "ticket_close",



    async execute(interaction){


        await interaction.reply({

            content:
            "🔒 Closing ticket in 5 seconds...",

            ephemeral:true

        });



        setTimeout(async()=>{


            await interaction.channel.delete()
            .catch(()=>{});


        },5000);



    }


};
