const fs = require("fs");

const {
    EmbedBuilder,
    AttachmentBuilder
} = require("discord.js");

const config = require("../config");


const vouchPath = "./database/vouches.json";
const statsPath = "./database/settings.json";


module.exports = {

async execute(message){


    if(message.author.bot)
        return;


    if(message.attachments.size === 0)
        return;


    let vouches = {};

    if(fs.existsSync(vouchPath)){

        vouches = JSON.parse(
            fs.readFileSync(vouchPath)
        );

    }


    const pending =
    vouches[message.author.id];


    if(!pending)
        return;



    let stats = {

        totalVouches:0,
        averageRating:0

    };


    if(fs.existsSync(statsPath)){

        stats = JSON.parse(
            fs.readFileSync(statsPath)
        );

    }



    stats.totalVouches++;


    stats.averageRating =
    (
        (
            stats.averageRating *
            (stats.totalVouches - 1)
        )
        +
        Number(pending.rating)

    )
    /
    stats.totalVouches;



    fs.writeFileSync(

        statsPath,

        JSON.stringify(
            stats,
            null,
            2
        )

    );



    const stars =
    "⭐".repeat(
        Number(pending.rating)
    );



    const proof =
    message.attachments.first();



    const file =
    new AttachmentBuilder(
        proof.url,
        {
            name:"proof.png"
        }
    );



    const embed =
    new EmbedBuilder()

    .setColor(
        config.COLORS.RED
    )

    .setTitle(
        `💎 CUSTOMER REVIEW #${stats.totalVouches}`
    )

    .setDescription(

`
👤 **Customer**

${message.author}


━━━━━━━━━━━━━━


⭐ **Rating**

${stars}

${pending.rating}/5


🎮 **Service Used**

${pending.service}


💬 **Feedback**

${pending.feedback}


📸 **Proof**

✅ Verified


━━━━━━━━━━━━━━


💎 **Sinner Services**

`

    )

    .setImage(
        "attachment://proof.png"
    )

    .setTimestamp()

    .setFooter({

        text:
        "Sinner Services • Verified Reviews"

    });



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
                file
            ]

        });

    }



    await message.delete()
    .catch(()=>{});



    delete vouches[message.author.id];


    fs.writeFileSync(

        vouchPath,

        JSON.stringify(
            vouches,
            null,
            2
        )

    );


}

};
