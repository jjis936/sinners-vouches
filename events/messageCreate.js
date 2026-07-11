const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


module.exports = {

    async execute(message) {


        if(message.author.bot)
            return;


        // Only continue if there is an upload

        if(message.attachments.size === 0)
            return;



        const embed = new EmbedBuilder()

        .setColor(
            config.COLORS.RED
        )

        .setTitle(
            "📸 Proof Received"
        )

        .setDescription(
`
👤 **Customer**

${message.author}


📎 **Uploaded Files**

Your proof has been received.
`

        )

        .setTimestamp()

        .setFooter({

            text:
            "Sinner Services • Proof System"

        });



        const channel =
        message.guild.channels.cache.get(
            config.VOUCH_CHANNEL_ID
        );



        if(!channel)
            return;



        await channel.send({

            embeds:[
                embed
            ],

            files:[
                ...message.attachments.values()
            ]

        });


    }

};
