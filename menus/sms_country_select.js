const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");
const { setSession, getSession } = require("../smsSessions");


module.exports = {

    customId: "sms_country_select",

    async execute(interaction){

        const country = interaction.values[0];

        setSession(interaction.user.id, { country });

        const session = getSession(interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} SINNER SERVICES • NUMBER RENTAL`)
            .setDescription(
                `Provider: **${session.provider}**\n` +
                `Service: **${session.service}**\n` +
                `Region: **${country}**\n\n` +
                "Ready to buy. This will charge your provider balance."
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        const buy = new ButtonBuilder()
            .setCustomId("sms_buy")
            .setLabel("💳 Buy Number")
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder().addComponents(buy);

        await interaction.update({
            embeds: [embed],
            components: [row]
        });

    }

};
