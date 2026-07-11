const fs = require("fs");

const path = "./database/vouches.json";


module.exports = {


customId: "vouch_form",


async execute(interaction){


const rating =
interaction.fields.getTextInputValue(
"rating"
);


const feedback =
interaction.fields.getTextInputValue(
"feedback"
);


const service =
interaction.fields.getTextInputValue(
"service"
);



let data = {};


if(fs.existsSync(path)){

data = JSON.parse(
fs.readFileSync(path)
);

}



data[interaction.user.id] = {

rating: rating,

feedback: feedback,

service: service,

time: Date.now()

};



fs.writeFileSync(

path,

JSON.stringify(
data,
null,
2
)

);



await interaction.reply({

content:
"✅ Vouch information saved!\n\n📸 Now send your proof screenshot or video in this channel.",

ephemeral:true

});



}

};
