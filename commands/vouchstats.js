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
"View Sinner Services review statistics"
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
Number(stats.averageRating)
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
📊 **Customer Review Statistics**

━━━━━━━━━━━━━━━━


⭐ **Total Vouches**

${stats.totalVouches}


⭐ **Average Rating**

${average}/5


🏆 **Reputation**

${average >= 4.5 ? "Excellent" :
average >= 4 ? "Great" :
average >= 3 ? "Good" :
"Needs Improvement"}


━━━━━━━━━━━━━━━━


💎 Sinner Services

`

)

.setTimestamp()

.setFooter({

text:
"Trusted Customer Reviews"

});



await interaction.reply({

embeds:[
embed
]

});



}

};
