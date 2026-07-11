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

const panel = require("./commands/panel");
const vouchstats = require("./commands/vouchstats");
const post = require("./commands/post");
const embed = require("./commands/embed");

client.commands.set(panel.data.name, panel);
client.commands.set(vouchstats.data.name, vouchstats);
client.commands.set(post.data.name, post);
client.commands.set(embed.data.name, embed);

// ================================
// MESSAGE EVENTS
// ================================

const messageEvent = require("./events/messageCreate");

client.on("messageCreate", async (message) => {

    try {

        await messageEvent.execute(message);

    } catch (error) {

        console.log("Message Error:", error);

    }

});

// ================================
// READY
// ================================

client.once("ready", () => {

    console.log(`💎 ${client.user.tag} is online`);

    client.user.setActivity("Sinner Services V2 | Vouches");

});

// ================================
// INTERACTIONS
// ================================

client.on("interactionCreate", async (interaction) => {

    try {

        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            await command.execute(interaction);

        }

        if (interaction.isButton()) {

            if (interaction.customId === "leave_vouch") {

                const button = require("./buttons/leave_vouch");

                await button.execute(interaction);

            }

        }

        if (interaction.isModalSubmit()) {

            if (interaction.customId === "vouch_form") {

                const modal = require("./modals/vouch_form");

                await modal.execute(interaction);

            }

        }

    } catch (error) {

        console.log("Interaction Error:", error);

        if (!interaction.replied && !interaction.deferred) {

            await interaction.reply({
                content: "❌ Something went wrong.",
                ephemeral: true
            });

        }

    }

});

// ================================
// LOGIN
// ================================

client.login(config.TOKEN);
