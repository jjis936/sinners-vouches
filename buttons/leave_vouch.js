const {
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require("discord.js");


module.exports = {

    customId: "leave_vouch",


    async execute(interaction) {


        const modal = new ModalBuilder()

        .setCustomId("vouch_form")

        .setTitle(
            "Sinner Services Vouch"
        );



        const rating = new TextInputBuilder()

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

        .setRequired(true);



        const feedback = new TextInputBuilder()

        .setCustomId("feedback")

        .setLabel(
            "💬 Feedback"
        )

        .setStyle(
            TextInputStyle.Paragraph
        )

        .setPlaceholder(
            "Describe your experience..."
        )

        .setRequired(true);



        const service = new TextInputBuilder()

        .setCustomId("service")

        .setLabel(
            "🎮 Service Used"
        )

        .setStyle(
            TextInputStyle.Short
        )

        .setPlaceholder(
            "Example: BO7 Boosting"
        )

        .setRequired(true);



        modal.addComponents(

            new ActionRowBuilder()
            .addComponents(rating),


            new ActionRowBuilder()
            .addComponents(feedback),


            new ActionRowBuilder()
            .addComponents(service)

        );



        await interaction.showModal(modal);


    }

};
