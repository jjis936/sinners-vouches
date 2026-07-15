module.exports = {

    name: "interactionCreate",

    async execute(interaction, client) {


        // Slash commands
        if(interaction.isChatInputCommand()){


            const command =
            client.commands.get(
                interaction.commandName
            );


            if(!command)
                return;


            try {

                await command.execute(interaction);

            } catch(error){

                console.error(error);


                if(!interaction.replied){

                    await interaction.reply({

                        content:
                        "❌ There was an error running this command.",

                        ephemeral:true

                    });

                }

            }

        }



        // Buttons
        if(interaction.isButton()){


            const button =
            client.buttons.get(
                interaction.customId
            );


            if(!button)
                return;


            try {

                await button.execute(interaction, client);

            } catch(error){

                console.error(error);

            }

        }



        // Modals
        if(interaction.isModalSubmit()){


            const modal =
            client.modals.get(
                interaction.customId
            );


            if(!modal)
                return;


            try {

                await modal.execute(interaction, client);

            } catch(error){

                console.error(error);

            }

        }


    }

};
