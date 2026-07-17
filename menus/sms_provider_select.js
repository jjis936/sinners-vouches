const {
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const config = require("../config");
const { setSession } = require("../smsSessions");
const { SERVICES } = require("../smsData");


module.exports = {

    customId: "sms_provider_select",

    async execute(interaction){

        const provider = interaction.values[0];

        setSession(interaction.user.id, { provider });

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} SINNER SERVICES • NUMBER RENTAL`)
            .setDescription(`Provider: **${provider}**\n\nNow pick a service:`)
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("sms_service_select")
            .setPlaceholder("Choose a service...")
            .addOptions(
                SERVICES.map(s => ({ label: s.label, value: s.value }))
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.update({
            embeds: [embed],
            components: [row]
        });

    }

};
