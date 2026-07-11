require("dotenv").config();

const { REST, Routes } = require("discord.js");


// YOUR IDS

const CLIENT_ID = "1525205213827436635";

const GUILD_ID = "1500601982740856875";



// LOAD COMMANDS

const commands = [

    require("./commands/panel").data.toJSON(),

    require("./commands/vouchstats").data.toJSON(),

    require("./commands/post").data.toJSON(),

    require("./commands/embed").data.toJSON(),

    require("./commands/giveaway").data.toJSON()

];



// DISCORD REST

const rest = new REST({

    version: "10"

}).setToken(process.env.TOKEN);



// DEPLOY

(async()=>{

    try{


        console.log(
            "⏳ Deploying Sinner Services commands..."
        );


        console.log(
            "Client ID:",
            CLIENT_ID
        );


        console.log(
            "Guild ID:",
            GUILD_ID
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
            "✅ Commands deployed successfully!"
        );


    }

    catch(error){


        console.log(
            "❌ Deploy Error:"
        );


        console.log(error);


    }


})();
