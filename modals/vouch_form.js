const fs = require("fs");


const path =
"./database/vouches.json";


const cooldownPath =
"./database/cooldowns.json";



const COOLDOWN_TIME =
30 * 60 * 1000; // 30 minutes



module.exports = {


customId: "vouch_form",



async execute(interaction){



let cooldowns = {};



if(fs.existsSync(cooldownPath)){


    cooldowns = JSON.parse(

        fs.readFileSync(
            cooldownPath
        )

    );


}



const userID =
interaction.user.id;



// ================================
// CHECK COOLDOWN
// ================================


if(cooldowns[userID]){


    const timePassed =
    Date.now() -
    cooldowns[userID];



    const remaining =
    COOLDOWN_TIME -
    timePassed;



    if(remaining > 0){


        const minutes =
        Math.ceil(
            remaining / 60000
        );



        return interaction.reply({

            content:
            `⏰ You already submitted a vouch. Please wait ${minutes} minutes before submitting another.`,

            ephemeral:true

        });


    }


}



// ================================
// SAVE VOUCH DATA
// ================================


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




// Validation

if(
Number(rating) < 1 ||
Number(rating) > 5
){


return interaction.reply({

content:
"❌ Rating must be between 1-5.",

ephemeral:true

});


}



if(feedback.length < 5){


return interaction.reply({

content:
"❌ Please provide more feedback.",

ephemeral:true

});


}





let vouches = {};



if(fs.existsSync(path)){


vouches =
JSON.parse(

fs.readFileSync(path)

);


}



vouches[userID] = {


rating,

feedback,

service,

username:
interaction.user.username,


time:
Date.now()


};



fs.writeFileSync(

path,

JSON.stringify(

vouches,

null,

2

)

);




// Save cooldown

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
"✅ Vouch saved!\n\n📸 Now upload your proof image/video.",

ephemeral:true

});



}


};
