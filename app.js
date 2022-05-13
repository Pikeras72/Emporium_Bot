// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot

const Discord = require("discord.js");

const Client = new Discord.Client({ intents : ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER", "REACTION"]});

Client.on("ready", () => {
    console.log(Client.user.tag + " comienza su camino");
});

Client.on("messageCreate", (message) => {
    if (message.author.bot == false && (message.content == "$hola" || message.content == "$hello")){
        message.channel.send(`Recuerda ${message.author}... tu oscuridad es mi luz`);
        console.log(message);
    }
});

Client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M");