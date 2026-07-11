const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

const fs = require("fs");

const config = require("../config");


const path =
"./database/users.json";



module.exports = {


data:

new SlashCommandBuilder()

.setName("leaderboard")

.setDescription(
"View top Sinner Services customers"
),



async execute(interaction){



let users = {};



if(fs.existsSync(path)){


users =
JSON.parse(
fs.readFileSync(path)
);


}



const sorted =
Object.entries(users)

.sort(
(a,b)=>
b[1].vouches -
a[1].vouches
)

.slice(0,10);



let text =
"";


if(sorted.length === 0){

text =
"No vouches recorded yet.";

}

else{


sorted.forEach(
(user,index)=>{


text +=
`${index+1}. <@${user[0]}> — ⭐ ${user[1].vouches} vouches\n`;


});


}



const embed =

new EmbedBuilder()

.setColor(
config.COLORS.RED
)

.setTitle(
"🏆 SINNER SERVICES LEADERBOARD"
)

.setDescription(

`
${text}

━━━━━━━━━━━━━━

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
