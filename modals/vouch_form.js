const fs = require("fs");


const vouchPath =
"./database/vouches.json";


const cooldownPath =
"./database/cooldowns.json";


const COOLDOWN_TIME =
30 * 60 * 1000;



module.exports = {


customId: "vouch_form",



async execute(interaction){


let cooldowns = {};



if(fs.existsSync(cooldownPath)){


    cooldowns =
    JSON.parse(
        fs.readFileSync(cooldownPath)
    );


}




const userID =
interaction.user.id;



// ===============================
// COOLDOWN
// ===============================


if(cooldowns[userID]){


    const remaining =
    COOLDOWN_TIME -
    (
        Date.now()
        -
        cooldowns[userID]
    );



    if(remaining > 0){


        return interaction.reply({

            content:
            `⏰ You already submitted a vouch. Try again in ${Math.ceil(remaining / 60000)} minutes.`,

            ephemeral:true

        });


    }


}






// ===============================
// DATA
// ===============================


const rating =
interaction.fields.getTextInputValue(
"rating"
);



const service =
interaction.fields.getTextInputValue(
"service"
);



const feedback =
interaction.fields.getTextInputValue(
"feedback"
);





const ratingNumber =
Number(rating);





if(
isNaN(ratingNumber) ||
ratingNumber < 1 ||
ratingNumber > 5
){


return interaction.reply({

content:
"❌ Rating must be between 1 and 5.",

ephemeral:true

});


}





if(feedback.length < 5){


return interaction.reply({

content:
"❌ Your review needs more detail.",

ephemeral:true

});


}







// ===============================
// SAVE PENDING VOUCH
// ===============================


let vouches = {};



if(fs.existsSync(vouchPath)){


vouches =
JSON.parse(
fs.readFileSync(vouchPath)
);


}




vouches[userID] = {


username:
interaction.user.username,


userID,


rating:
ratingNumber,


service,


feedback,


created:
Date.now(),



expires:
Date.now() + 5 * 60 * 1000



};





fs.writeFileSync(

vouchPath,

JSON.stringify(

vouches,

null,

2

)

);







// ===============================
// COOLDOWN SAVE
// ===============================


cooldowns[userID] =
Date.now();



fs.writeFileSync(

cooldownPath,

JSON.stringify(

cooldowns,

null,

2

)

);






await interaction.reply({

content:
`
✅ **Vouch started!**

📸 Upload your proof screenshot/video in this channel.

⏳ You have **5 minutes**.

After uploading, Sinner Services will automatically post your verified vouch.
`,

ephemeral:true

});




}


};
