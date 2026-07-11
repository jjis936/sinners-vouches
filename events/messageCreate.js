const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


module.exports = {


name:"messageCreate",


async execute(message){


    if(message.author.bot)
        return;


    if(!message.attachments.size)
        return;



    if(!message.content.includes("PROOF"))
        return;



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
👤 Customer

${message.author}


📸 Proof Attached

Thank you for your review!

━━━━━━━━━━━━━━━━

💎 Sinner Services
`
    )

    .setTimestamp();



    const channel =
    message.guild.channels.cache.get(
        config.VOUCH_CHANNEL_ID
    );



    if(channel){

        await channel.send({

            embeds:[
                embed
            ],

            files:[
                ...message.attachments.values()
            ]

        });

    }


}

};
