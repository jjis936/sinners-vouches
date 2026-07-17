const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const config = require("../config");
const { setSession, getSession } = require("../smsSessions");
const { COUNTRIES } = require("../smsData");


module.exports = {

    customId: "sms_service_select",

    async execute(interaction){

        const service = interaction.values[0];

        setSession(interaction.user.id, { service });

        const session = getSession(interaction.user.id);

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} SINNER SERVICES • NUMBER RENTAL`)
            .setDescription(
                `Provider: **${session.provider}** | Service: **${service}**\n\n` +
                "Now pick a region:"
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("sms_country_select")
            .setPlaceholder("Choose a region...")
            .addOptions(
                COUNTRIES.map(c => ({ label: c.label, value: c.value }))
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.update({
            embeds: [embed],
            components: [row]
        });

    }

};
