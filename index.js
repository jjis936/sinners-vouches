require("dotenv").config();

const {
Client,
GatewayIntentBits,
Collection
} = require("discord.js");

const config = require("./config");


const client = new Client({

intents:[

GatewayIntentBits.Guilds,

GatewayIntentBits.GuildMessages,

GatewayIntentBits.MessageContent

]

});



client.commands = new Collection();



const panel =
require("./commands/panel");


client.commands.set(
panel.data.name,
panel
);




// MESSAGE EVENT

const messageEvent =
require("./events/messageCreate");

client.on(
"messageCreate",
message => {

try {

messageEvent.execute(message);

}

catch(error){

console.log(error);

}

});




// READY

client.once("ready",()=>{


console.log(
`💎 ${client.user.tag} is online`
);


});




// INTERACTIONS

client.on(
"interactionCreate",
async interaction=>{


try{


if(
interaction.isChatInputCommand()
){


const command =
client.commands.get(
interaction.commandName
);


if(command){

await command.execute(
interaction
);

}


}




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

console.log(error);


}


});




client.login(
config.TOKEN
);
