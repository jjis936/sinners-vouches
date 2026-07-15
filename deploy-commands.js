require("dotenv").config();

const { REST, Routes } = require("discord.js");


// ================================
// Sinner Services IDs
// ================================

const CLIENT_ID = "1525205213827436635";

const GUILD_ID = "1500601982740856875";



// ================================
// LOAD COMMANDS
// ================================

const commands = [

    // ================================
    // MAIN COMMANDS
    // ================================

    require("./commands/panel").data.toJSON(),

    require("./commands/vouchstats").data.toJSON(),

    require("./commands/post").data.toJSON(),

    require("./commands/embed").data.toJSON(),

    require("./commands/giveaway").data.toJSON(),

    require("./commands/ticketpanel").data.toJSON(),



    // ================================
    // MODERATION COMMANDS
    // ================================

    require("./commands/ban").data.toJSON(),

    require("./commands/kick").data.toJSON(),

    require("./commands/warn").data.toJSON(),

    require("./commands/timeout").data.toJSON()

];





// ================================
// DISCORD REST
// ================================

const rest = new REST({

    version: "10"

}).setToken(

    process.env.TOKEN

);






// ================================
// DEPLOY
// ================================

(async()=>{


try{


console.log(
"🚀 Deploying Sinner Services slash commands..."
);


console.log(
`📌 Client ID: ${CLIENT_ID}`
);


console.log(
`📌 Guild ID: ${GUILD_ID}`
);


console.log(
`📦 Total Commands: ${commands.length}`
);





await rest.put(

    Routes.applicationGuildCommands(

        CLIENT_ID,

        GUILD_ID

    ),

    {

        body: commands

    }

);





console.log(
"✅ Slash commands deployed successfully!"
);


console.log(
"💎 Sinner Services is updated!"
);



}

catch(error){


console.error(
"❌ Command deployment failed:"
);


console.error(error);


}


})();
