const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

const config = require("../config");


const statsPath =
"./database/settings.json";


module.exports = {


data:

new SlashCommandBuilder()

.setName("vouchstats")

.setDescription(
"View Sinner Services statistics"
),



async execute(interaction){


let stats = {

totalVouches:0,

averageRating:0

};



if(fs.existsSync(statsPath)){


stats =
JSON.parse(
fs.readFileSync(statsPath)
);


}



const average =
Number(stats.averageRating || 0)
.toFixed(1);



let reputation =
"Needs Improvement";


if(average >= 4.5)
reputation = "🔥 Excellent";


else if(average >= 4)
reputation = "⭐ Great";


else if(average >= 3)
reputation = "👍 Good";



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
⭐ **Customer Reviews**

━━━━━━━━━━━━━━━━


📊 **Total Vouches**

${stats.totalVouches}


⭐ **Average Rating**

${average}/5


🏆 **Reputation**

${reputation}


━━━━━━━━━━━━━━━━


💎 Sinner Services

`

)

.setTimestamp();



await interaction.reply({

embeds:[
embed
]

});


}

};
