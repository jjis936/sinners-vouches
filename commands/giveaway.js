const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");
const path = require("path");


const filePath = path.join(
    __dirname,
    "../data/giveaways.json"
);



module.exports = {

data: new SlashCommandBuilder()

.setName("giveaway")

.setDescription("Create an automatic giveaway")

.addStringOption(option =>
    option
    .setName("prize")
    .setDescription("Giveaway prize")
    .setRequired(true)
)

.addIntegerOption(option =>
    option
    .setName("duration")
    .setDescription("Duration in minutes")
    .setRequired(true)
),



async execute(interaction){


if(
!interaction.member.permissions.has(
PermissionFlagsBits.ManageGuild
)
){

return interaction.reply({

content:"❌ You need Manage Server permission.",

ephemeral:true

});

}



const prize =
interaction.options.getString("prize");


const duration =
interaction.options.getInteger("duration");



const endTime =
Date.now() + duration * 60000;



const embed = new EmbedBuilder()

.setColor("#B30000")

.setTitle("🎉 Sinner Services Giveaway")

.setDescription(
`
🎁 **Prize**
${prize}

⏰ **Ends**
<t:${Math.floor(endTime / 1000)}:R>

👥 **Entries**
0

━━━━━━━━━━━━━━

Click below to enter!
`
)

.setFooter({

text:"Sinner Services"

})

.setTimestamp();



const button =
new ButtonBuilder()

.setCustomId("giveaway_enter")

.setLabel("🎉 Enter Giveaway")

.setStyle(ButtonStyle.Danger);



const row =
new ActionRowBuilder()

.addComponents(button);



const message =
await interaction.channel.send({

embeds:[embed],

components:[row]

});



let giveaways = [];

if(fs.existsSync(filePath)){

giveaways =
JSON.parse(
fs.readFileSync(filePath)
);

}



giveaways.push({

messageId: message.id,

channelId: interaction.channel.id,

guildId: interaction.guild.id,

prize: prize,

endTime: endTime,

entries: []

});



fs.writeFileSync(

filePath,

JSON.stringify(
giveaways,
null,
2
)

);



await interaction.reply({

content:"✅ Giveaway created and timer started!",

ephemeral:true

});



}

};
