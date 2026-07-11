const fs = require("fs");

const path = "./database/vouches.json";


module.exports = {


customId: "vouch_form",


async execute(interaction){


const rating =
interaction.fields.getTextInputValue("rating");


const feedback =
interaction.fields.getTextInputValue("feedback");


const service =
interaction.fields.getTextInputValue("service");



const number =
Number(rating);



if(
number < 1 ||
number > 5 ||
isNaN(number)
){

return interaction.reply({

content:
"❌ Rating must be between 1 and 5.",

ephemeral:true

});

}




let data = {};



if(fs.existsSync(path)){

data =
JSON.parse(
fs.readFileSync(path)
);

}



if(data[interaction.user.id]){


return interaction.reply({

content:
"⚠️ You already have a pending vouch.",

ephemeral:true

});


}



data[interaction.user.id] = {


rating:number,

feedback:feedback,

service:service,

created:Date.now()


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

"✅ Review saved!\n\n📸 Please upload your proof screenshot/video.",

ephemeral:true

});


}


};
