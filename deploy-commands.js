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
        .setDescription("Create the Sinner Services vouch panel")
        .toJSON(),


    new SlashCommandBuilder()
        .setName("vouchstats")
        .setDescription("View Sinner Services statistics")
        .toJSON(),


    new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("View top Sinner Services customers")
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
// DEPLOY COMMANDS
// ================================

(async () => {

    try {

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


    } catch(error) {


        console.log(
            "❌ Deploy Error:"
        );


        console.log(error);


    }


})();
