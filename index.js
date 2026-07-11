require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder
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

client.buttons = new Collection();

client.giveaways = [];



// ================================
// LOAD COMMANDS
// ================================

const commandFiles = [

    "./commands/panel",
    "./commands/vouchstats",
    "./commands/post",
    "./commands/embed",
    "./commands/giveaway"

];


for(const file of commandFiles){

    const command = require(file);

    client.commands.set(
        command.data.name,
        command
    );

}



// ================================
// LOAD BUTTONS
// ================================

const buttonFiles = [

    "./buttons/leave_vouch",
    "./buttons/giveaway_enter"

];


for(const file of buttonFiles){

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
// COMMANDS + BUTTONS
// ================================

client.on(
"interactionCreate",
async interaction=>{


try{


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


}


catch(error){

console.log(
"Interaction Error:",
error
);

}


});





// ================================
// GIVEAWAY TIMER
// ================================

setInterval(async()=>{


for(const giveaway of client.giveaways){



if(
giveaway.ended
)
continue;



if(
Date.now() >= giveaway.endTime
){


giveaway.ended = true;



const guild =
client.guilds.cache.get(
giveaway.guildId
);



if(!guild)
continue;



const channel =
guild.channels.cache.get(
giveaway.channelId
);



if(!channel)
continue;



let winner = "No entries";


if(
giveaway.entries.length > 0
){


winner = `<@${

giveaway.entries[

Math.floor(

Math.random() *

giveaway.entries.length

)

]

}>`;


}



const embed =
new EmbedBuilder()

.setColor("#B30000")

.setTitle("🎉 Giveaway Ended!")

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

text:"Sinner Services"

})

