require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection,
    EmbedBuilder
} = require("discord.js");

const config = require("./config");
const startWebsiteAPI = require("./website-api");



const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ]

});




// =================================
// COLLECTIONS
// =================================

client.commands = new Collection();

client.buttons = new Collection();

client.modals = new Collection();

client.giveaways = new Map();





// =================================
// COMMAND LOADER
// =================================

const commands = [

    // Main
    "./commands/panel",
    "./commands/vouchstats",
    "./commands/post",
    "./commands/embed",
    "./commands/giveaway",
    "./commands/ticketpanel",

    // Moderation
    "./commands/ban",
    "./commands/kick",
    "./commands/warn",
    "./commands/timeout"

];



for(const file of commands){

    try{


        const command = require(file);


        client.commands.set(

            command.data.name,

            command

        );


        console.log(
            `✅ Loaded command: ${command.data.name}`
        );


    }catch(error){


        console.log(

            `❌ Command failed: ${file}`,

            error.message

        );


    }

}






// =================================
// BUTTON LOADER
// =================================

const buttons = [

    "./buttons/leave_vouch",
    "./buttons/giveaway_enter",
    "./buttons/ticket_close",
    "./buttons/claim_ticket",
    "./buttons/close_ticket"

];



for(const file of buttons){


    try{


        const button =
        require(file);



        client.buttons.set(

            button.customId,

            button

        );


        console.log(
            `✅ Loaded button: ${button.customId}`
        );


    }catch(error){


        console.log(

            `❌ Button failed: ${file}`,

            error.message

        );


    }

}







// =================================
// MODAL LOADER
// =================================

const modals = [

    "./modals/vouch_form"

];



for(const file of modals){


    try{


        const modal =
        require(file);



        client.modals.set(

            modal.customId,

            modal

        );


        console.log(
            `✅ Loaded modal: ${modal.customId}`
        );


    }catch(error){


        console.log(

            `❌ Modal failed: ${file}`,

            error.message

        );


    }

}








// =================================
// BOT READY
// =================================

client.once("ready",()=>{


    console.log(

        `💎 ${client.user.tag} is online`

    );



    client.user.setActivity(

        "Sinner Services V2 | Orders"

    );



    startWebsiteAPI(client);


});
// =================================
// INTERACTIONS
// =================================

client.on(
"interactionCreate",
async interaction=>{


try{


// ===============================
// SLASH COMMANDS
// ===============================

if(interaction.isChatInputCommand()){


    const command =
    client.commands.get(
        interaction.commandName
    );


    if(command){

        await command.execute(interaction);

    }

}






// ===============================
// BUTTONS
// ===============================

if(interaction.isButton()){


    const button =
    client.buttons.get(
        interaction.customId
    );


    if(button){


        await button.execute(interaction);


    }else{


        await interaction.reply({

            content:
            "❌ Button not configured.",

            ephemeral:true

        }).catch(()=>{});


    }


}






// ===============================
// MODALS
// ===============================

if(interaction.isModalSubmit()){


    const modal =
    client.modals.get(
        interaction.customId
    );


    if(modal){


        await modal.execute(interaction);


    }else{


        console.log(
            "Unknown modal:",
            interaction.customId
        );


    }


}






// ===============================
// SELECT MENUS
// ===============================

if(interaction.isStringSelectMenu()){


    if(
        interaction.customId === "ticket_select"
    ){


        const menu =
        require(
            "./menus/ticket_select"
        );


        await menu.execute(interaction);


    }


}



}catch(error){


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
    "❌ Something went wrong.",

    ephemeral:true

}).catch(()=>{});


}


}



});








// =================================
// GIVEAWAY SYSTEM
// =================================

setInterval(async()=>{


for(
const giveaway of client.giveaways.values()
){


if(giveaway.ended)
continue;



if(Date.now() >= giveaway.endTime){



giveaway.ended = true;



const channel =
await client.channels.fetch(
    giveaway.channelId
)
.catch(()=>null);



if(!channel)
continue;




let winner = null;



if(giveaway.entries.length > 0){


winner =
giveaway.entries[
Math.floor(
Math.random() *
giveaway.entries.length
)
];


}





const embed =
new EmbedBuilder()

.setColor("#b026ff")

.setTitle(
"🎉 GIVEAWAY ENDED"
)

.setDescription(
`
🎁 **Prize**

${giveaway.prize}


🏆 **Winner**

${
winner
?
`<@${winner}>`
:
"No valid entries"
}


👥 **Entries**

${giveaway.entries.length}


━━━━━━━━━━━━━━

💜 Sinner Services
`
)

.setTimestamp();






await channel.send({

content:

winner

?

`🎊 Congratulations <@${winner}>! You won **${giveaway.prize}**!`

:

"⚠ Giveaway ended. No one entered.",


embeds:[embed]

});




}


}


},10000);









// =================================
// MESSAGE EVENTS
// =================================

client.on(
"messageCreate",
async message=>{


try{


const event =
require(
"./events/messageCreate"
);



await event.execute(message);



}catch(error){


console.log(

"Message Event Error:",

error.message

);


}


});









// =================================
// LOGIN
// =================================

client.login(

config.TOKEN

);
