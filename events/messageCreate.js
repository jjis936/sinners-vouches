const fs = require("fs");

const {
    EmbedBuilder
} = require("discord.js");

const config = require("../config");


const path =
"./database/vouches.json";



module.exports = {


async execute(message){


    if(message.author.bot)
        return;



    // No attachment = ignore

    if(message.attachments.size === 0)
        return;



    let data = {};



    if(fs.existsSync(path)){

        data = JSON.parse(
            fs.readFileSync(path)
        );

    }



    const userVouch =
    data[message.author.id];



    // User has no pending vouch

    if(!userVouch)
        return;




    const proof =
    message.attachments.first();




    const stars =
    "⭐".repeat(
        Math.min(
            Number(userVouch.rating),
            5
        )
    );




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

${message.author}


━━━━━━━━━━━━━━━━


⭐ **Rating**

${stars}


🎮 **Service Used**

${userVouch.service}


💬 **Feedback**

${userVouch.feedback}


📸 **Proof**

Attached below


━━━━━━━━━━━━━━━━


💎 **Sinner Services**

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
                proof.url
            ]

        });


    }




    // Delete proof message

    await message.delete()
    .catch(()=>{});




    // Remove saved vouch

    delete data[message.author.id];


    fs.writeFileSync(

        path,

        JSON.stringify(
            data,
            null,
            2
        )

    );



}

};
