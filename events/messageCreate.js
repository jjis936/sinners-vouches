const fs = require("fs");

const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


const vouchPath =
"./database/vouches.json";


const statsPath =
"./database/settings.json";



module.exports = {


async execute(message){


    if(message.author.bot)
        return;



    // Only process uploads

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



    // No pending review

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




    stats.totalVouches += 1;



    const oldTotal =
    stats.totalVouches - 1;



    stats.averageRating =
    (
        (
            stats.averageRating *
            oldTotal
        )
        +
        Number(pending.rating)

    )
    /
    stats.totalVouches;




    const reviewNumber =
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



    let ratingText =
    "Average";



    if(pending.rating == 5)
        ratingText = "Excellent";

    if(pending.rating == 4)
        ratingText = "Great";

    if(pending.rating == 3)
        ratingText = "Good";

    if(pending.rating <= 2)
        ratingText = "Needs Improvement";





    const embed =
    new EmbedBuilder()

    .setColor(
        config.COLORS.RED
    )

    .setTitle(
        `💎 CUSTOMER REVIEW #${reviewNumber}`
    )

    .setDescription(

`
👤 **Customer**

${message.author}


━━━━━━━━━━━━━━━━


⭐ **Rating**

${stars}

${pending.rating}/5 • ${ratingText}


🎮 **Service Used**

${pending.service}


💬 **Feedback**

${pending.feedback}


📸 **Proof**

✅ Verified


━━━━━━━━━━━━━━━━


💎 **Sinner Services**

`

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

            embeds:[embed],

            files:[

                message.attachments.first().url

            ]

        });


    }




    // Remove uploaded proof message

    await message.delete()
    .catch(()=>{});




    // Clear pending review

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
