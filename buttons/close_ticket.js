module.exports = {

    customId:"close_ticket",


    async execute(interaction){


        await interaction.reply({

            content:"🔒 Closing ticket in 5 seconds...",

            ephemeral:false

        });



        setTimeout(()=>{


            interaction.channel.delete().catch(()=>{});


        },5000);



    }

};
