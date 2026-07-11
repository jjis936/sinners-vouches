const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


module.exports = {

async execute(message){


    if(message.author.bot)
        return;


    if(message.attachments.size === 0)
        return;



    // ONLY watch channels named proof

    if(
        !message.channel.name.includes("proof")
    )
        return;



    const embed =
    new EmbedBuilder()

    .setColor(
        config.COLORS.RED
    )

    .setTitle(
        "💎 NEW CUSTOMER PROOF"
    )

    .setDescription(
`
👤 Customer

${message.author}


📸 Proof Submitted

Thank you for providing proof.
`

    )

    .setTimestamp();



    const vouchChannel =
    message.guild.channels.cache.get(
        config.VOUCH_CHANNEL_ID
    );



    if(vouchChannel){


        await vouchChannel.send({

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
