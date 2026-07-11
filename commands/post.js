const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");


module.exports = {


data: new SlashCommandBuilder()

.setName("post")

.setDescription(
    "Create a Sinner Services announcement embed"
)

.addStringOption(option =>

    option

    .setName("title")

    .setDescription("Announcement title")

    .setRequired(true)

)


.addStringOption(option =>

    option

    .setName("message")

    .setDescription("Announcement message")

    .setRequired(true)

),



async execute(interaction){



if(
!interaction.member.permissions.has(
PermissionFlagsBits.ManageMessages
)

){

return interaction.reply({

content:
"❌ You do not have permission to use this command.",

ephemeral:true

});

}



const title =
interaction.options.getString(
"title"
);



const message =
interaction.options.getString(
"message"
);



const embed =
new EmbedBuilder()

.setColor(
config.COLORS.RED
)

.setTitle(
`💎 ${title}`
)

.setDescription(

`
${message}


━━━━━━━━━━━━━━

💎 **Sinner Services**

`

)

.setTimestamp()

.setFooter({

text:
"Sinner Services"

});



await interaction.reply({

content:
"✅ Announcement posted!",

ephemeral:true

});



await interaction.channel.send({

embeds:[
embed
]

});



}


};
