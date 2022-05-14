// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot

const Discord = require("discord.js");

const client = new Discord.Client({ intents : ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER", "REACTION"]});
const prefix = "$";
const blockedUsers = [];//añadir los ids de los bloqueados

client.on('ready', () => {
    console.log(client.user.tag + " comienza su camino");
    client.user.setStatus('idle'); // online, idle, invisible, dnd
    client.user.setActivity("Discovering the unknown...");
    console.log('Bot status: ',client.user.presence.status);
});

client.on("message", function(msg) {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (blockedUsers.includes(msg.author.id)){msg.reply(`${msg.author} no eres digno de poder utilizarme`);return;}
    const commandBody = msg.content.slice(1);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "hola" ||command === "hello" ){
        msg.reply(`Recuerda ${msg.author}... tu oscuridad, es mi luz`);
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter + x);
        msg.reply(`Resultado de la suma: ${sum}`);
    }
    else if (command === "sub") {
        const numArgs = args.map(x => parseFloat(x));
        const sub = numArgs.reduce((counter, x) => counter - x);
        msg.reply(`Resultado de la resta: ${sub}`);
    }
    else if (command === "mul") {
        const numArgs = args.map(x => parseFloat(x));
        const mul = numArgs.reduce((counter, x) => counter * x);
        msg.reply(`Resultado de la multiplicación: ${mul}`);
    }
    else if (command === "div") {
        const numArgs = args.map(x => parseFloat(x));
        const div = numArgs.reduce((counter, x) => counter / x);
        msg.reply(`Resultado de la división: ${div}`);
    }
    else if (command === "picture"){
        msg.channel.send('https://mymodernmet.com/wp/wp-content/uploads/2019/10/nasa-black-hole-visualization-2.gif');
    }
    else if (command === 'server') {
        msg.reply(`Nombre del server: ${msg.guild.name}\nNumero de integrantes: ${msg.guild.memberCount}`);
    }
    else if (command === 'user') {
        msg.reply(`Tu tag: ${msg.author.tag}\nTu ID: ${msg.author.id}`);
    }
    else if (command === 'block'){
        const userBlock = args.shift();
        if (userBlock === undefined){
            msg.channel.send(`No has especificado la ID del usuario a bloquear`);
        }else{
            blockedUsers.push(userBlock);
            msg.channel.send(`Se ha bloqueado mi uso al usuario con ID: ${userBlock}`);
        }
    }
    else if (command === 'unblock'){
        const userBlock = args.shift();
        if (userBlock === undefined){
            msg.reply(`No has especificado la ID del usuario a desbloquear`);
        }else{
            const index = blockedUsers.indexOf(userBlock);
            if (index > -1) {
                blockedUsers.splice(index, 1);// 2nd parameter means remove one item only
                msg.channel.send(`Se ha desbloqueado mi uso al usuario con ID: ${userBlock}`);
            }else{
                msg.channel.send(`El usuario con ID: ${userBlock} ya estaba desbloqueado o no se encuentra en el servidor`);
            }
        }
    }
    else if (command === 'unblockall'){
        while (blockedUsers.length > 0){
            const user = blockedUsers.pop();
            msg.channel.send(`Se ha desbloqueado mi uso al usuario con ID: ${user}`);
        }
    }
    else if(command === 'myroles'){
        msg.reply(`Tus roles: ${msg.member.roles}`);
    }
    else{
        msg.reply(`Aún no tengo el conocimiento necesario para entender esa orden ${msg.author}`);
    }
});
/*
client.on("guildMemberAdd",function (member){
    general.send(`Has llegado a tu final ${member.user.username}`);
});*/

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M");