// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot

const Discord = require("discord.js");

const client = new Discord.Client({ intents : ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER", "REACTION"]});

client.on('ready', () => {
    console.log(client.user.tag + " comienza su camino");
    client.user.setStatus('dnd'); // online, idle, invisible, dnd
    console.log('Bot status: ',client.user.presence.status);
});

// Bot listenning messages
client.on("message", msg => {
    if (msg.author.bot === false && (msg.content === "$hola" || msg.content === "$hello")){
        msg.channel.send(`Recuerda ${msg.author}... tu oscuridad es mi luz`);
        console.log(msg);
    }

    if(msg.content === "$profilePicture"){
        msg.channel.send('https://mymodernmet.com/wp/wp-content/uploads/2019/10/nasa-black-hole-visualization-2.gif');
    }
});

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M");