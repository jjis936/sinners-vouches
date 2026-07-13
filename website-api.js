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


const app = express();


// Allow website connection
app.use(cors());

app.use(express.json());



// ===============================
// DISCORD SETTINGS
// ===============================


const GUILD_ID = "1500601982740856875";

const TICKET_CATEGORY = "1521521002545152170";

const STAFF_ROLE = "1520900962867216506";





// ===============================
// START API
// ===============================


function startWebsiteAPI(client){



app.get("/", (req,res)=>{


res.send("Sinner Services Website API Online");


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





console.log("New Website Order:");

console.log(req.body);






const guild = client.guilds.cache.get(GUILD_ID);




if(!guild){


return res.status(404).json({


success:false,


error:"Discord server not found"


});


}








const ticket = await guild.channels.create({



name:


`ticket-${customer}`

.toLowerCase()

.replace(/[^a-z0-9]/g,""),




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



.setTitle(

"💎 Sinner Services Order"

)



.setDescription(`


**Customer**

${customer}



**Service**

${service}



**Package**

${package}



**Price**

$${price}



**Notes**

${notes || "No notes"}



━━━━━━━━━━━━━━

Sinner Services

`)



.setTimestamp();









const buttons = new ActionRowBuilder()



.addComponents(


new ButtonBuilder()

.setCustomId("claim_ticket")

.setLabel("👋 Claim Ticket")

.setStyle(ButtonStyle.Primary),




new ButtonBuilder()

.setCustomId("close_ticket")

.setLabel("🔒 Close Ticket")

.setStyle(ButtonStyle.Danger),




new ButtonBuilder()

.setCustomId("transcript")

.setLabel("📄 Transcript")

.setStyle(ButtonStyle.Secondary)



);









await ticket.send({



content:

`<@&${STAFF_ROLE}> New website order!`,



embeds:[embed],



components:[buttons]



});







res.json({


success:true,


ticket:ticket.id


});





}

catch(error){



console.error(

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

process.env.PORT || 3000,


()=>{


console.log(

"🌐 Website API Online"

);


});


}




module.exports = startWebsiteAPI;
