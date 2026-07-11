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

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

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
// EVENTS
// ================================

const messageEvent =
require("./events/messageCreate");



client.on(
    "messageCreate",
    async message => {

        try {

            await messageEvent.execute(
                message
            );

        } catch(error){

            console.log(error);

        }

    }
);



// ================================
// READY
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


try {



    // Slash Commands

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



    // Buttons

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




    // Modals

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



}

catch(error){


console.log(
    "Interaction Error:",
    error
);



if(!interaction.replied){

    await interaction.reply({

        content:
        "❌ Something went wrong.",

        ephemeral:true

    });

}


}



});



// ================================
// LOGIN
// ================================

client.login(
    config.TOKEN
);
