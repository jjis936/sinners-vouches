const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {

    data: new SlashCommandBuilder()

        .setName("embed")
        .setDescription("Create a premium announcement embed")

        .addStringOption(option =>
            option
                .setName("title")
                .setDescription("Embed title")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("description")
                .setDescription("Embed message")
                .setRequired(true)
        )

        .addStringOption(option =>
            option
                .setName("color")
                .setDescription("Embed color hex (#B30000)")
                .setRequired(false)
        )

        .addAttachmentOption(option =>
            option
                .setName("picture")
                .setDescription("Upload an image")
                .setRequired(false)
        )

        .addStringOption(option =>
            option
                .setName("footer")
                .setDescription("Footer text")
                .setRequired(false)
        ),



    async execute(interaction) {


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ManageMessages
            )
        ){

            return interaction.reply({

                content:"❌ You don't have permission.",
                ephemeral:true

            });

        }



        const title =
        interaction.options.getString("title");


        const description =
        interaction.options.getString("description");


        const color =
        interaction.options.getString("color") || "#B30000";


        const footer =
        interaction.options.getString("footer");


        const picture =
        interaction.options.getAttachment("picture");



        const embed =
        new EmbedBuilder()

        .setColor(color)

        .setTitle(`💎 ${title}`)

        .setDescription(description)

        .setTimestamp();



        if(footer){

            embed.setFooter({

                text: footer

            });

        }



        if(picture){

            embed.setImage(
                picture.url
            );

        }



        await interaction.channel.send({

            embeds:[embed]

        });



        await interaction.reply({

            content:"✅ Premium embed posted!",
            ephemeral:true

        });


    }

};
