const express = require("express");
const cors = require("cors");

const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


const database = require("./database");



const app = express();



app.use(cors({

    origin:"*",

    methods:["GET","POST"],

    allowedHeaders:["Content-Type"]

}));



app.use(express.json());





const GUILD_ID = "1500601982740856875";

const TICKET_CATEGORY = "1509955721008250921";

const STAFF_ROLE = "1520900962867216506";






function startWebsiteAPI(client){





app.get("/",(req,res)=>{


    res.send("Sinner Services API Online");


});









app.post("/create-order", async(req,res)=>{


try{



const {

customer,

service,

package,

price,

notes


} = req.body;





// SAVE ORDER

const order = database.createOrder({


customer,

service,

package,

price,

notes


});







const guild = client.guilds.cache.get(

GUILD_ID

);




if(!guild){


return res.json({

success:false,

error:"Guild not found"

});


}








const ticket = await guild.channels.create({


name:

`${order.id}-${customer}`

.toLowerCase()

.replace(/[^a-z0-9-]/g,""),



type:

ChannelType.GuildText,



parent:

TICKET_CATEGORY,




permissionOverwrites:[


{

id:guild.roles.everyone.id,

deny:[

PermissionFlagsBits.ViewChannel

]

},



{

id:STAFF_ROLE,

allow:[

PermissionFlagsBits.ViewChannel,

PermissionFlagsBits.SendMessages,

PermissionFlagsBits.ReadMessageHistory

]

}



]



});









const embed = new EmbedBuilder()


.setColor("#B30000")


.setTitle("💎 Sinner Services Order")


.setDescription(`


**Order ID**

${order.id}



**Customer**

${customer}



**Service**

${service}



**Package**

${package}



**Price**

$${price}



**Status**

🟡 Pending



**Notes**

${notes || "None"}



━━━━━━━━━━━━━━

Sinner Services

`)


.setTimestamp();









const buttons = new ActionRowBuilder()


.addComponents(


new ButtonBuilder()

.setCustomId("claim_ticket")

.setLabel("👋 Claim")

.setStyle(ButtonStyle.Primary),




new ButtonBuilder()

.setCustomId("order_progress")

.setLabel("🔵 Start")

.setStyle(ButtonStyle.Secondary),




new ButtonBuilder()

.setCustomId("order_complete")

.setLabel("🟢 Complete")

.setStyle(ButtonStyle.Success),




new ButtonBuilder()

.setCustomId("close_ticket")

.setLabel("🔒 Close")

.setStyle(ButtonStyle.Danger)



);









await ticket.send({


content:

`<@&${STAFF_ROLE}> New Order Received!`,



embeds:[embed],



components:[buttons]


});








res.json({


success:true,


order:order.id,


ticket:ticket.id


});





}

catch(error){



console.log(

"Website API Error:",

error

);



res.status(500).json({


success:false,


error:error.message


});



}



});









app.listen(

process.env.PORT || 8080,

"0.0.0.0",

()=>{


console.log(

"🌐 API listening"

);


}

);



}





module.exports = startWebsiteAPI;
