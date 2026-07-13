const {
    PermissionFlagsBits
} = require("discord.js");


module.exports = {

    customId: "claim_ticket",


    async execute(interaction){


        await interaction.deferReply({ephemeral:true});


        await interaction.channel.permissionOverwrites.edit(

            interaction.user.id,

            {

                ViewChannel:true,

                SendMessages:true,

                ReadMessageHistory:true

            }

        );



        await interaction.channel.send({

            content:

            `👋 **Ticket Claimed**\n\nStaff member: <@${interaction.user.id}>`

        });



        await interaction.editReply({

            content:"✅ You claimed this ticket."

        });



    }

};
