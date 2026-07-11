require("dotenv").config();

const {
REST,
Routes,
SlashCommandBuilder
} = require("discord.js");



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
"View top customers"
)

.toJSON()



];



const rest = new REST({

version:"10"

}).setToken(
process.env.TOKEN
);



(async()=>{


try{


console.log(
"⏳ Deploying commands..."
);



await rest.put(

Routes.applicationCommands(
process.env.CLIENT_ID
),

{

body:commands

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
