const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");


module.exports = {

    data: new SlashCommandBuilder()

    .setName("timeout")

    .setDescription("Timeout a user")

    .addUserOption(option =>
        option
        .setName("user")
        .setDescription("User to timeout")
        .setRequired(true)
    )

    .addIntegerOption(option =>
        option
        .setName("minutes")
        .setDescription("Timeout length in minutes")
        .setRequired(true)
    )

    .addStringOption(option =>
        option
        .setName("reason")
        .setDescription("Reason")
        .setRequired(false)
    ),



    async execute(interaction){


        if(
            !interaction.member.permissions.has(
                PermissionFlagsBits.ModerateMembers
            )
        ){

            return interaction.reply({

                content:
                "❌ You need Timeout Members permission.",

                ephemeral:true

            });

        }



        const user =
        interaction.options.getUser("user");


        const minutes =
        interaction.options.getInteger("minutes");


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



        if(!member.moderatable){

            return interaction.reply({

                content:
                "❌ I cannot timeout this user. Check role hierarchy.",

                ephemeral:true

            });

        }



        await member.timeout(

            minutes * 60 * 1000,

            reason

        );




        const embed =
        new EmbedBuilder()

        .setColor("#b026ff")

        .setTitle("⏳ User Timed Out")

        .setDescription(
`
👤 **User**

${user}


👮 **Moderator**

${interaction.user}


⏱️ **Duration**

${minutes} minutes


📝 **Reason**

${reason}
`
        )

        .setTimestamp();



        await interaction.reply({

            embeds:[
                embed
            ]

        });


    }

};
