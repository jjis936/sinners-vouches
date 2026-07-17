const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");


function createButtons(buttons){


    const row =
    new ActionRowBuilder();



    buttons.forEach(button => {


        if(!button)
            return;



        const parts =
        button.split("|");



        const label =
        parts[0];


        const type =
        parts[1];


        const value =
        parts[2];



        const btn =
        new ButtonBuilder()

        .setLabel(label);



        if(type === "link"){

            btn
            .setStyle(
                ButtonStyle.Link
            )
            .setURL(value);


        } else {


            btn
            .setStyle(
                ButtonStyle.Primary
            )
            .setCustomId(value);


        }



        row.addComponents(btn);


    });



    return row;

}


module.exports = {
    createButtons
};
