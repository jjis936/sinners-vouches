require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [

    require("./commands/panel").data.toJSON(),

    require("./commands/vouchstats").data.toJSON(),

    require("./commands/post").data.toJSON(),

    require("./commands/embed").data.toJSON(),

    require("./commands/giveaway").data.toJSON(),

    require("./commands/ticketpanel").data.toJSON()

];


const rest = new REST({

    version:"10"

}).setToken(process.env.TOKEN);



(async()=>{


try{


console.log("⏳ Deploying Sinner Services commands...");


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
"✅ Commands deployed successfully!"
);



}

catch(error){

console.error(
"❌ Deploy Error:"
);

console.error(error);

}


})();
