const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


module.exports = {


customId: "vouch_form",



async execute(interaction){


const rating =
interaction.fields.getTextInputValue(
"rating"
);


const feedback =
interaction.fields.getTextInputValue(
"feedback"
);


const service =
interaction.fields.getTextInputValue(
"service"
);



const stars =
"⭐".repeat(
Math.min(Number(rating),5)
);



const embed = new EmbedBuilder()

.setColor(
config.COLORS.RED
)

.setTitle(
"💎 NEW CUSTOMER REVIEW"
)

.setDescription(

`
👤 **Customer**

${interaction.user}


━━━━━━━━━━━━━━━━

⭐ **Rating**

${stars}


🎮 **Service**

${service}


💬 **Feedback**

${feedback}


━━━━━━━━━━━━━━━━

💎 **Sinner Services**

`

)

.setTimestamp();



await interaction.reply({

content:
"✅ Your vouch has been submitted!",

ephemeral:true

});



await interaction.channel.send({

embeds:[
embed
]

});


}


};
