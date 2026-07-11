require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const config = require("./config");

const client = new Client({

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]

});


// COMMANDS

client.commands = new Collection();

try {

    const panel = require("./commands/panel");

    client.commands.set(
        panel.data.name,
        panel
    );

    console.log("✅ Panel command loaded");

} catch(error){

    console.log(
        "❌ Panel command error:",
        error
    );

}


// READY

client.once("ready", () => {

    console.log(
        `💎 ${client.user.tag} is online`
    );

});



// INTERACTIONS

client.on(
"interactionCreate",
async interaction => {


    try {


        // SLASH COMMANDS

        if(
            interaction.isChatInputCommand()
        ){

            const command =
            client.commands.get(
                interaction.commandName
            );


            if(!command)
                return;


            await command.execute(
                interaction
            );

        }



        // BUTTONS

        if(
            interaction.isButton()
        ){

            if(
                interaction.customId === "leave_vouch"
            ){

                const button =
                require("./buttons/leave_vouch");


                await button.execute(
                    interaction
                );

            }

        }



        // MODALS

        if(
            interaction.isModalSubmit()
        ){

            if(
                interaction.customId === "vouch_form"
            ){

                const modal =
                require("./modals/vouch_form");


                await modal.execute(
                    interaction
                );

            }

        }



    } catch(error){


        console.log(
            "Interaction Error:",
            error
        );


        if(!interaction.replied){

            await interaction.reply({

                content:
                "❌ Something went wrong. Please try again.",

                ephemeral:true

            });

        }


    }


});



client.login(
    config.TOKEN
);
