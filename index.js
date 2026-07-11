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



client.once("ready",()=>{


console.log(
`💎 ${client.user.tag} is online`
);


client.user.setActivity(
"Sinner Services V2 | Vouches"
);


});





client.login(config.TOKEN);
