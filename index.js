require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const config = require("./config");


// ================================
// CREATE CLIENT
// ================================

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages

    ]

});


// ================================
// COMMAND SYSTEM
// ================================

client.commands = new Collection();


// Load Commands

const panel = require("./commands/panel");


client.commands.set(
    panel.data.name,
    panel
);



// ================================
// BOT ONLINE
// ================================

client.once("ready", () => {


    console.log(
        `💎 ${client.user.tag} is online`
    );


    client.user.setPresence({

        activities: [

            {

                name:
                "Sinner Services V2 | Vouches"

            }

        ],

        status:
        "online"

    });


});



// ================================
// COMMAND HANDLER
// ================================

client.on(
"interactionCreate",
async interaction => {


    // Slash commands

    if(
        interaction.isChatInputCommand()
    ){

        const command =
        client.commands.get(
            interaction.commandName
        );


        if(!command)
            return;



        try {


            await command.execute(
                interaction
            );


        }


        catch(error){


            console.log(error);



            await interaction.reply({

                content:
                "❌ Command error.",

                ephemeral:true

            });


        }


    }



    // Buttons will go here later


    if(
        interaction.isButton()
    ){


        console.log(
            "Button clicked:",
            interaction.customId
        );


    }



});



// ================================
// LOGIN
// ================================

client.login(
    config.TOKEN
);
