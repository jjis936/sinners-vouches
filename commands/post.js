const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config");


module.exports = {


data: new SlashCommandBuilder()

.setName("post")

.setDescription(
"Create a
