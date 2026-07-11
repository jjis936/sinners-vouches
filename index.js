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



// COMMANDS

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



// BUTTONS

const buttonFiles = [

    "./buttons/leave_vouch",

    "./buttons/giveaway_enter"

];



client.buttons = new Collection();



for(const file of buttonFiles){

    const button = require(file);

    client.buttons.set(

        button.id || file.split("/").pop(),

        button

    );

}




// MESSAGE SYSTEM

client.on(

"messageCreate",

async message=>{

    try{

        const event =
        require("./events/messageCreate");


        await event.execute(message);


    }

    catch(error){

        console.log(
            "Message Error:",
            error
        );

    }

});




// READY

client.once(

"ready",

()=>{


console.log(

`💎 ${client.user.tag} is online`

);



client.user.setActivity(

"Sinner Services V2 | Vouches"

);


});




// INTERACTIONS

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



if(!command)
return;



await command.execute(

interaction

);


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



// MODALS

if(interaction.isModalSubmit()){


if(interaction.customId === "vouch_form"){


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

content:"❌ Something went wrong.",

ephemeral:true

});


}


}



});




client.login(

config.TOKEN

);
