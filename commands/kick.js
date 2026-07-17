const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

    .setName("kick")

    .setDescription("Kick a user from the server")

    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("User to kick")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Reason for kick")
        .setRequired(false)
    ),



    async execute(interaction){


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.KickMembers
            )
        ){

            return interaction.reply({

                content:
                "❌ You need Kick Members permission.",

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
                "❌ User not found.",

                ephemeral:true

            });

        }



        if(!member.kickable){

            return interaction.reply({

                content:
                "❌ I cannot kick this user. Check role hierarchy.",

                ephemeral:true

            });

        }




        await member.kick(reason);





        const embed =
        new EmbedBuilder()

        .setColor("#ef4444")

        .setTitle("👢 User Kicked")

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
