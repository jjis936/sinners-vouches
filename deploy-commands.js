require("dotenv").config();

const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");


// ================================
// COMMANDS
// ================================

const commands = [


    new SlashCommandBuilder()

    .setName("panel")

    .setDescription(
        "Create the Sinner Services vouch panel"
    )

    .toJSON(),



    new SlashCommandBuilder()

    .setName("vouchstats")

    .setDescription(
        "View Sinner Services statistics"
    )

    .toJSON(),



    new SlashCommandBuilder()

    .setName("leaderboard")

    .setDescription(
        "View top Sinner Services customers"
    )

    .toJSON()


];



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
process.env.GUILD_ID
);



await rest.put(


Routes.applicationGuildCommands(

    process.env.CLIENT_ID,

    process.env.GUILD_ID

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
