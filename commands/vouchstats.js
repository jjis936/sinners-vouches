const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

const config = require("../config");


module.exports = {


    data: new SlashCommandBuilder()

        .setName("vouchstats")

        .setDescription(
            "View Sinner Services vouch statistics"
        ),



    async execute(interaction){


        const statsPath =
        "./database/settings.json";



        let stats = {

            totalVouches: 0,

            averageRating: 0

        };



        if(fs.existsSync(statsPath)){

            stats = JSON.parse(
                fs.readFileSync(statsPath)
            );

        }



        const average =
        Number(stats.averageRating || 0)
        .toFixed(1);



        const embed =
        new EmbedBuilder()

        .setColor(
            config.COLORS.RED
        )

        .setTitle(
            "💎 SINNER SERVICES STATS"
        )

        .setDescription(

`
━━━━━━━━━━━━━━━━

📊 **Total Vouches**

${stats.totalVouches}


⭐ **Average Rating**

${average}/5


🏆 **Reputation**

${average >= 4.5 ? "Excellent ⭐⭐⭐⭐⭐" : "Growing ⭐⭐⭐⭐"}


━━━━━━━━━━━━━━━━

💎 **Sinner Services**

Trusted Reviews • Premium Service

`

        )

        .setTimestamp()

        .setFooter({

            text:
            "Sinner Services • Statistics"

        });



        await interaction.reply({

            embeds:[
                embed
            ]

        });



    }


};
