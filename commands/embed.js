const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits,
    ChannelType
} = require("discord.js");

const config = require("../config");

const {
    createButtons
} = require("../buttons/embed_buttons");


module.exports = {

    data: new SlashCommandBuilder()

        .setName("embed")
        .setDescription("Create a premium announcement embed")


        .addChannelOption(option =>
            option
                .setName("channel")
                .setDescription("Channel to send the embed")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )


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
                .setDescription("Embed color")
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
                .setDescription("Large image URL")
                .setRequired(false)
        )


        .addStringOption(option =>
            option
                .setName("thumbnail")
                .setDescription("Thumbnail URL")
                .setRequired(false)
        )


        .addStringOption(option =>
            option
                .setName("mention")
                .setDescription("Mention everyone or here")
                .addChoices(
                    {
                        name:"Everyone",
                        value:"everyone"
                    },
                    {
                        name:"Here",
                        value:"here"
                    }
                )
                .setRequired(false)
        )


        .addStringOption(option =>
            option
                .setName("button1")
                .setDescription(
                    "Example: Open Ticket|button|ticket"
                )
                .setRequired(false)
        )


        .addStringOption(option =>
            option
                .setName("button2")
                .setDescription(
                    "Example: Leave Vouch|button|leave_vouch"
                )
                .setRequired(false)
        )


        .addStringOption(option =>
            option
                .setName("button3")
                .setDescription(
                    "Example: Website|link|https://example.com"
                )
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
                "❌ You need Manage Messages permission.",

                ephemeral:true

            });

        }



        const channel =
        interaction.options.getChannel(
            "channel"
        );


        const title =
        interaction.options.getString(
            "title"
        );


        const description =
        interaction.options.getString(
            "description"
        );


        const color =
        interaction.options.getString(
            "color"
        )
        ||
        config.COLORS.RED;



        const footer =
        interaction.options.getString(
            "footer"
        );


        const image =
        interaction.options.getString(
            "image"
        );


        const thumbnail =
        interaction.options.getString(
            "thumbnail"
        );


        const mention =
        interaction.options.getString(
            "mention"
        );



        const buttons = [

            interaction.options.getString(
                "button1"
            ),

            interaction.options.getString(
                "button2"
            ),

            interaction.options.getString(
                "button3"
            )

        ].filter(Boolean);



        const embed =
        new EmbedBuilder()


        .setColor(color)


        .setTitle(
            `💎 ${title}`
        )


        .setDescription(
            description
        )


        .setTimestamp();



        if(footer){

            embed.setFooter({

                text: footer

            });

        }


        if(image){

            embed.setImage(image);

        }


        if(thumbnail){

            embed.setThumbnail(thumbnail);

        }



        let content = null;



        if(mention === "everyone"){

            content = "@everyone";

        }


        if(mention === "here"){

            content = "@here";

        }



        let components = [];



        if(buttons.length > 0){

            components.push(
                createButtons(buttons)
            );

        }



        await channel.send({

            content,

            embeds:[embed],

            components

        });



        await interaction.reply({

            content:
            "✅ Premium embed with buttons posted!",

            ephemeral:true

        });


    }

};
