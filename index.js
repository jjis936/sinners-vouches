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
// COMMAND COLLECTION
// ================================

client.commands = new Collection();



// Load Commands

const panel =
require("./commands/panel");


const vouchstats =
require("./commands/vouchstats");



client.commands.set(
    panel.data.name,
    panel
);


client.commands.set(
    vouchstats.data.name,
    vouchstats
);



// ================================
// MESSAGE EVENT
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


    }


    catch(error){


        console.log(
            "Message Event Error:",
            error
        );


    }


});



// ================================
// BOT READY
// ================================

client.once(
"ready",
()=>{


console.log(
`💎 ${client.user.tag} is online`
);



client.user.setPresence({

activities:[

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
// INTERACTIONS
// ================================

client.on(
"interactionCreate",
async interaction => {


try{


// ----------------
// SLASH COMMANDS
// ----------------


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




// ----------------
// BUTTONS
// ----------------


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




// ----------------
// MODALS
// ----------------


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



if(
!interaction.replied &&
!interaction.deferred
){


await interaction.reply({

content:
"❌ Something went wrong. Please try again.",

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
