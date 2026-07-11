require("dotenv").config();

const {
    REST,
    Routes
} = require("discord.js");


// ================================
// LOAD COMMANDS
// ================================

const commands = [

    require("./commands/panel")
        .data
        .toJSON(),


    require("./commands/vouchstats")
        .data
        .toJSON(),


    require("./commands/post")
        .data
        .toJSON(),


    require("./commands/leaderboard")
        ? require("./commands/leaderboard")
            .data
            .toJSON()
        : null

].filter(Boolean);



// ================================
// DISCORD API
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
"⏳ Deploying Sinner Services commands..."
);



console.log(
"Client ID:",
process.env.CLIENT_ID
);



console.log(
"Guild ID:",
"1500601982740856875"
);



await rest.put(

Routes.applicationGuildCommands(

    process.env.CLIENT_ID,

    "1500601982740856875"

),

{

    body: commands

}

);



console.log(
"✅ Sinner Services commands deployed!"
);



}


catch(error){


console.log(
"❌ Deploy Error:"
);


console.log(error);


}


})();
