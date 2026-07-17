const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");


const warningFile =
"./database/warnings.json";



module.exports = {


data: new SlashCommandBuilder()

.setName("warn")

.setDescription("Warn a user")

.addUserOption(option =>
    option
    .setName("user")
    .setDescription("User to warn")
    .setRequired(true)
)

.addStringOption(option =>
    option
    .setName("reason")
    .setDescription("Reason for warning")
    .setRequired(true)
),



async execute(interaction){


if(
!interaction.member.permissions.has(
    PermissionFlagsBits.ModerateMembers
)
){

return interaction.reply({

content:
"❌ You need moderation permissions.",

ephemeral:true

});

}




const user =
interaction.options.getUser("user");


const reason =
interaction.options.getString("reason");





let warnings = {};



if(fs.existsSync(warningFile)){


warnings =
JSON.parse(
fs.readFileSync(warningFile)
);


}



if(!warnings[user.id]){

warnings[user.id] = [];

}



warnings[user.id].push({

moderator:
interaction.user.id,

reason,

time:
Date.now()

});





fs.writeFileSync(

warningFile,

JSON.stringify(

warnings,

null,

2

)

);







const embed =
new EmbedBuilder()

.setColor("#f59e0b")

.setTitle("⚠️ User Warned")

.setDescription(
`
👤 **User**

${user}


👮 **Moderator**

${interaction.user}


📝 **Reason**

${reason}


📊 **Total Warnings**

${warnings[user.id].length}
`
)

.setFooter({

text:
"Sinner Services Moderation"

})

.setTimestamp();





await interaction.reply({

embeds:[
embed
]

});


}

};
