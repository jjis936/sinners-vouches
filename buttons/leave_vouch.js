const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = {

    customId: "leave_vouch",


    async execute(interaction) {


        const modal =
        new ModalBuilder()

        .setCustomId("vouch_form")

        .setTitle(
            "💎 Sinner Services Vouch"
        );



        const rating =
        new TextInputBuilder()

        .setCustomId("rating")

        .setLabel(
            "⭐ Rating (1-5)"
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setPlaceholder(
            "Example: 5"
        )

        .setMaxLength(1)

        .setRequired(true);



        const service =
        new TextInputBuilder()

        .setCustomId("service")

        .setLabel(
            "🎮 Service Used"
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setPlaceholder(
            "Example: Premium Service"
        )

        .setMaxLength(50)

        .setRequired(true);



        const feedback =
        new TextInputBuilder()

        .setCustomId("feedback")

        .setLabel(
            "💬 Your Review"
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setPlaceholder(
            "Tell us about your experience with Sinner Services..."
        )

        .setMaxLength(1000)

        .setRequired(true);



        modal.addComponents(

            new ActionRowBuilder()
            .addComponents(rating),


            new ActionRowBuilder()
            .addComponents(service),


            new ActionRowBuilder()
            .addComponents(feedback)

        );



        await interaction.showModal(modal);


    }

};
