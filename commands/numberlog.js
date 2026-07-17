const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const config = require("../config");
const { getRecentOrders } = require("../database/numbers");


module.exports = {

    data: new SlashCommandBuilder()
        .setName("numberlog")
        .setDescription("Staff: view recent SMS number rental orders")
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction){

        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageGuild
            )
        ){
            return interaction.reply({
                content: "❌ You don't have permission to view this.",
                ephemeral: true
            });
        }

        const orders = getRecentOrders(10);

        const lines = orders.length
            ? orders.map(o =>
                `**${o.id}** • <@${o.buyer}> • ${o.provider} • ${o.service}/${o.country} • ${o.status}`
              ).join("\n")
            : "No number orders yet.";

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`${config.BRAND.EMOJI} RECENT NUMBER ORDERS`)
            .setDescription(lines)
            .setFooter({ text: `${config.BRAND.NAME} • Staff Log` })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });

    }

};
