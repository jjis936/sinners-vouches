require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder
} = require("discord.js");

const config = require("./config");


const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ]

});



client.commands = new Collection();

client.buttons = new Collection();

client.giveaways = [];



// ================================
// COMMANDS
// ================================

const commands = [

    "./commands/panel",
    "./commands/vouchstats",
    "./commands/post",
    "./commands/embed",
    "./commands/giveaway",
    "./commands/ticketpanel"

];


for(const file of commands){

    const command = require(file);

    client.commands.set(

        command.data.name,

        command

    );

}



// ================================
// BUTTONS
// ================================

const buttons = [

    "./buttons/leave_vouch",
    "./buttons/giveaway_enter",
    "./buttons/ticket_close"

];


for(const file of buttons){

    const button = require(file);

    client.buttons.set(

        button.customId,

        button

    );

}



// ================================
// READY
// ================================

client.once("ready",()=>{


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

async interaction=>{


try{


// SLASH COMMANDS

if(interaction.isChatInputCommand()){


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




// BUTTONS

if(interaction.isButton()){


const button =

client.buttons.get(

interaction.customId

);



if(button){

await button.execute(

interaction

);

}


}




// DROPDOWN MENUS

if(interaction.isStringSelectMenu()){


if(

interaction.customId === "ticket_select"

){


const menu =

require("./menus/ticket_select");


await menu.execute(

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

}).catch(()=>{});


}


}


});




// ================================
// GIVEAWAY TIMER
// ================================

setInterval(async()=>{


for(const giveaway of client.giveaways){



if(giveaway.ended)

continue;



if(Date.now() >= giveaway.endTime){



giveaway.ended = true;



const channel =

await client.channels.fetch(

giveaway.channelId

).catch(()=>null);



if(!channel)

continue;



let winner =

"No entries";



if(giveaway.entries.length > 0){


const id =

giveaway.entries[

Math.floor(

Math.random() *

giveaway.entries.length

)

];



winner =

`<@${id}>`;


}



const embed =

new EmbedBuilder()

.setColor("#B30000")

.setTitle(

"🎉 Giveaway Ended!"

)

.setDescription(

`
🏆 **Winner**

${winner}


🎁 **Prize**

${giveaway.prize}


👥 **Entries**

${giveaway.entries.length}


━━━━━━━━━━━━━━

Congratulations!
`

)

.setFooter({

text:

"Sinner Services"

});



await channel.send({

embeds:[embed]

});



}


}


},10000);




// ================================
// MESSAGE EVENTS
// ================================

client.on(

"messageCreate",

async message=>{


try{


const messageEvent =

require("./events/messageCreate");


await messageEvent.execute(

message

);


}

catch(error){


console.log(

"Message Error:",

error

);


}


});




// ================================
// LOGIN
// ================================

client.login(

config.TOKEN

);
