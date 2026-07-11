require("dotenv").config();

const { REST, Routes } = require("discord.js");

const commands = [
    require("./commands/panel").data.toJSON(),
    require("./commands/vouchstats").data.toJSON(),
    require("./commands/post").data.toJSON(),
    require("./commands/embed").data.toJSON()
];

const CLIENT_ID = process.env.CLIENT_ID;
const TOKEN = process.env.TOKEN;
const GUILD_ID = "1500601982740856875";

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
    try {
        console.log("⏳ Deploying commands...");
        console.log("Client ID:", CLIENT_ID);
        console.log("Guild ID:", GUILD_ID);

        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );

        console.log("✅ Commands deployed successfully!");
    } catch (error) {
        console.error(error);
    }
})();
