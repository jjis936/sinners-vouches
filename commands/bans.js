const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

    .setName("ban")

    .setDescription("Ban a user from the server")

    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("User to ban")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Reason for the ban")
        .setRequired(false)
    ),



    async execute(interaction){


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.BanMembers
            )
        ){

            return interaction.reply({

                content:
                "❌ You do not have permission to ban members.",

                ephemeral:true

            });

        }



        const user =
        interaction.options.getUser("user");


        const reason =
        interaction.options.getString("reason")
        ||
        "No reason provided";



        const member =
        await interaction.guild.members.fetch(
            user.id
        )
        .catch(()=>null);



        if(!member){

            return interaction.reply({

                content:
                "❌ Could not find that member.",

                ephemeral:true

            });

        }



        if(
            !member.bannable
        ){

            return interaction.reply({

                content:
                "❌ I cannot ban this user. My role may be too low.",

                ephemeral:true

            });

        }



        await member.ban({

            reason

        });




        const embed =
        new EmbedBuilder()

        .setColor("#ef4444")

        .setTitle("🔨 User Banned")

        .setDescription(
`
👤 **User**

${user}


👮 **Moderator**

${interaction.user}


📝 **Reason**

${reason}
`
        )

        .setFooter({

            text:
            "Sinner Services Moderation"

        })

        .setTimestamp();



        await interaction.reply({

            embeds:[
                embed
            ]

        });


    }

};
