const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

const config = require("../config");

module.exports = {

    data: new SlashCommandBuilder()
        .setName("post")
        .setDescription("Create a premium announcement")
        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("Embed title")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("Embed message")
                .setRequired(true)
        ),

    async execute(interaction) {

        if (
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ) {
            return interaction.reply({
                content: "❌ You don't have permission to use this command.",
                ephemeral: true
            });
        }

        const title = interaction.options.getString("title");
        const message = interaction.options.getString("message");

        const embed = new EmbedBuilder()
            .setColor(config.COLORS.RED)
            .setTitle(`💎 ${title}`)
            .setDescription(message)
            .setFooter({
                text: "Sinner Services"
            })
            .setTimestamp();

        await interaction.reply({
            content: "✅ Announcement posted!",
            ephemeral: true
        });

        await interaction.channel.send({
            embeds: [embed]
        });

    }

};
