const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

const config = require("../config");
const { setSession } = require("../smsSessions");


module.exports = {

    data: new SlashCommandBuilder()
        .setName("getnumber")
        .setDescription("Rent a temporary phone number for SMS verification"),

    async execute(interaction){

        setSession(interaction.user.id, {
            provider: null,
            service: null,
            country: null
        });

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} SINNER SERVICES • NUMBER RENTAL`)
            .setDescription(
                "Pick a provider below to get started.\n\n" +
                "You'll choose a **provider**, then a **service**, then a **region**, " +
                "and finish with a **Buy Number** button."
            )
            .setFooter({ text: `${config.BRAND.NAME} • SMS Verification` })
            .setTimestamp();

        const menu = new StringSelectMenuBuilder()
            .setCustomId("sms_provider_select")
            .setPlaceholder("Choose a provider...")
            .addOptions(
                { label: "5sim", value: "5sim", emoji: "5️⃣" },
                { label: "SMSPool", value: "smspool", emoji: "🌀" }
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.reply({
            embeds: [embed],
            components: [row],
            ephemeral: true
        });

    }

};
