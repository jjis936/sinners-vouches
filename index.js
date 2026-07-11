require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const config = require("./config");


// ================================
// CREATE BOT
// ================================

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages

    ]

});


// ================================
// COMMANDS
// ================================

client.commands = new Collection();


const panel =
require("./commands/panel");


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


    client.user.setActivity(
        "Sinner Services V2 | Vouches"
    );


});



// ================================
// INTERACTIONS
// ================================

client.on(
"interactionCreate",
async interaction => {



    // ============================
    // SLASH COMMANDS
    // ============================


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


        }


    }



    // ============================
    // BUTTONS
    // ============================


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



    // ============================
    // MODALS
    // ============================


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



});



// ================================
// LOGIN
// ================================

client.login(
    config.TOKEN
);
