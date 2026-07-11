require("dotenv").config();

const {
    REST,
    Routes
} = require("discord.js");

const {
    SlashCommandBuilder
} = require("discord.js");


// Commands list

const commands = [

    new SlashCommandBuilder()

    .setName("panel")

    .setDescription(
        "Create the Sinner Services vouch panel"
    )

    .toJSON()


];



// Discord API connection

const rest = new REST({

    version: "10"

}).setToken(
    process.env.TOKEN
);



// Deploy command

(async () => {


    try {


        console.log(
            "⏳ Deploying commands..."
        );


        await rest.put(

            Routes.applicationCommands(
                process.env.CLIENT_ID
            ),

            {

                body: commands

            }

        );



        console.log(
            "✅ Commands deployed!"
        );


    }


    catch(error){


        console.log(error);


    }


})();
