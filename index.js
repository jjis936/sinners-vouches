require("dotenv").config();

const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const config = require("./config");


// ================================
// CREATE BOT
// ================================

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,

        GatewayIntentBits.GuildMessages,

        GatewayIntentBits.MessageContent

    ]

});


// ================================
// COMMAND SYSTEM
// ================================

client.commands = new Collection();


// LOAD COMMANDS

const commandFiles = [

    "panel",
    "vouchstats",
    "post",
    "embed",
    "ban"

];


for (const file of commandFiles) {

    const command =
    require(`./commands/${file}`);

    client.commands.set(
        command.data.name,
        command
    );

}



// ================================
// MESSAGE EVENTS
// ================================

client.on(
    "messageCreate",
    async message => {

        try {

            const messageEvent =
            require("./events/messageCreate");

            await messageEvent.execute(message);

        } catch(error){

            console.log(
                "Message Error:",
                error
            );

        }

    }
);



// ================================
// READY
// ================================

client.once(
    "ready",
    () => {

        console.log(
            `💎 ${client.user.tag} is online`
        );


        client.user.setActivity(
            "Sinner Services V2 | Premium"
        );


    }
);



// ================================
// INTERACTIONS
// ================================

client.on(
    "interactionCreate",
    async interaction => {


        try {


            // SLASH COMMANDS

            if(
                interaction.isChatInputCommand()
            ){

                const command =
                client.commands.get(
                    interaction.commandName
                );


                if(!command)
                    return;


                await command.execute(
                    interaction
                );

            }



            // BUTTONS

            if(
                interaction.isButton()
            ){


                if(
                    interaction.customId === "leave_vouch"
                ){

                    const button =
                    require("./buttons/leave_vouch");


                    await button.execute(
                        interaction
                    );

                }


            }



            // MODALS

            if(
                interaction.isModalSubmit()
            ){


                if(
                    interaction.customId === "vouch_form"
                ){

                    const modal =
                    require("./modals/vouch_form");


                    await modal.execute(
                        interaction
                    );

                }


            }


        }


        catch(error){


            console.log(
                "Interaction Error:",
                error
            );


            if(!interaction.replied){

                await interaction.reply({

                    content:
                    "❌ Something went wrong.",

                    ephemeral:true

                });

            }


        }


    }
);



// ================================
// LOGIN
// ================================

client.login(
    config.TOKEN
);
