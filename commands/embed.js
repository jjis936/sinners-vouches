const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("embed")
        .setDescription("Create a premium embed")

        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("Embed title")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("Embed description")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("color")
                .setDescription("Embed color (hex)")
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName("footer")
                .setDescription("Footer text")
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName("image")
                .setDescription("Image URL")
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName("thumbnail")
                .setDescription("Thumbnail URL")
                .setRequired(false)
        ),



    async execute(interaction){

        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ){

            return interaction.reply({

                content:
                "❌ You don't have permission.",

                ephemeral:true

            });

        }



        const title =
        interaction.options.getString("title");

        const description =
        interaction.options.getString("description");

        const color =
        interaction.options.getString("color") ||
        "#B30000";

        const footer =
        interaction.options.getString("footer");

        const image =
        interaction.options.getString("image");

        const thumbnail =
        interaction.options.getString("thumbnail");



        const embed =
        new EmbedBuilder()

        .setColor(color)

        .setTitle(`💎 ${title}`)

        .setDescription(description)

        .setTimestamp();



        if(footer){

            embed.setFooter({

                text:footer

            });

        }



        if(image){

            embed.setImage(image);

        }



        if(thumbnail){

            embed.setThumbnail(thumbnail);

        }



        await interaction.channel.send({

            embeds:[embed]

        });



        await interaction.reply({

            content:
            "✅ Embed posted!",

            ephemeral:true

        });

    }

};
