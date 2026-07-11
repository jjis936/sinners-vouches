const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName("panel")
    .setDescription("Create the vouch panel")
    .toJSON()
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

client.once("ready", async () => {
  console.log(`✅ ${client.user.tag} is online!`);

  await rest.put(
    Routes.applicationCommands(client.user.id),
    { body: commands }
  );

  console.log("✅ Commands loaded!");
});

client.on("interactionCreate", async interaction => {
  console.log("Interaction received");

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "panel") {
    await interaction.reply({
      content: "📝 Sinner Services Vouch System is working!",
      ephemeral: false
    });
  }
});

client.login(process.env.TOKEN);
