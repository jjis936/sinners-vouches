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



let stars = "";

const number =
Math.min(
Math.max(
Number(rating),
1
),
5
);



stars =
"⭐".repeat(number);



const embed =
new EmbedBuilder()

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

${stars} (${number}/5)


🎮 **Service Used**

${service}


💬 **Feedback**

${feedback}


━━━━━━━━━━━━━━━━

💎 **Sinner Services**

`

)

.setTimestamp()

.setFooter({

text:
"Sinner Services • Customer Reviews"

});




// Send to vouch channel

const channel =
interaction.guild.channels.cache.get(
config.VOUCH_CHANNEL_ID
);



if(channel){

    await channel.send({

        embeds:[
            embed
        ]

    });

}



await interaction.reply({

content:
"✅ Your vouch has been submitted!",

ephemeral:true

});



}


};
