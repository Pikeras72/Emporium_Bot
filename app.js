// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot
//arreglar roles y arreglar lo de que no se muestra el numero de bots del server al hacer $server

const Discord = require("discord.js");

const client = new Discord.Client({ intents : ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES","GUILD_MEMBERS"],
    partials: ["MESSAGE", "CHANNEL", "GUILD_MEMBER", "USER", "REACTION"]});
const prefix = "$";
const blockedUsers = [];//añadir los ids de los bloqueados
const users = [];//añadir los ids de los usuarios

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
        if (msg.author.id === "506830615895736320"){ //id del admin
            msg.reply("¡Aviso! admin detectado, anden con cuidado...");
        }else{
            const option = Math.floor((Math.random() * (6)) + 1);
            switch (option) {
                case 1: {
                    msg.reply(`No te conozco mucho ${msg.author}... ¡pero HOLA igualmente!`);
                    break;
                }
                case 2:{
                    msg.reply(`¿Quién te crees que soy ${msg.author}? en vez de saludarme deberías arrodillarte`);
                    break;
                }
                case 3:{
                    msg.reply(`Shhhh silencio ${msg.author}. Nunca sabes quien puede estar escuchándonos...`);
                    break;
                }
                case 4:{
                    msg.reply(`Es un placer, estoy aquí para servirte ${msg.author}`);
                    break;
                }
                case 5:{
                    msg.reply(`Mis registros indican que ${msg.author} es una gran persona, protéjanla a cualquier coste`);
                    break;
                }
                case 6:{
                    msg.reply(`¿Se supone que tengo que saludarte? Lo siento ${msg.author}, no tengo tiempo para eso`);
                    break;
                }
                default: {
                    msg.reply(`¡HOLA! ${msg.author}`);
                }
            }
        }
    }
    else if (command === "sum") {
        const numArgs = args.map(x => parseFloat(x));
        try {
            const sum = numArgs.reduce((counter, x) => counter + x);
            if(!isNaN(sum)){
                msg.reply(`Resultado de la suma: ${sum}`);
            }else{
                msg.reply(`Entrada inválida`);
            }
        }catch (error){
            msg.reply("Error en la suma");
        }
    }
    else if (command === "sub") {
        const numArgs = args.map(x => parseFloat(x));
        try {
            const sub = numArgs.reduce((counter, x) => counter - x);
            if(!isNaN(sub)){
                msg.reply(`Resultado de la resta: ${sub}`);
            }else{
                msg.reply(`Entrada inválida`);
            }
        }catch (error){
            msg.reply("Error en la resta");
        }
    }
    else if (command === "mul") {
        const numArgs = args.map(x => parseFloat(x));
        try {
            const mul = numArgs.reduce((counter, x) => counter * x);
            if(!isNaN(mul)){
                msg.reply(`Resultado de la multiplicación: ${mul}`);
            }else{
                msg.reply(`Entrada inválida`);
            }
        }catch (error){
            msg.reply("Error en la multiplicación");
        }
    }
    else if (command === "div") {
        const numArgs = args.map(x => parseFloat(x));
        try {
            const div = numArgs.reduce((counter, x) => counter / x);
            if(!isNaN(div)){
                msg.reply(`Resultado de la división: ${div}`);
            }else{
                msg.reply(`Entrada inválida`);
            }
        }catch (error){
            msg.reply("Error en la división");
        }
    }
    else if (command === "picture"){
        msg.channel.send('https://mymodernmet.com/wp/wp-content/uploads/2019/10/nasa-black-hole-visualization-2.gif');
    }
    else if (command === 'server') {
        const server = client.guilds.cache.get('973655155297894420'); //id del server
        let cnt = 0;
        server.members.fetch().then(members => {
            members.forEach(member =>
            {
                if (!member.user.bot){
                    cnt++;
                }
            });
        });
        msg.reply(`Nombre del server: ${msg.guild.name}\nNumero de integrantes: ${cnt} miembros y ${server.memberCount-cnt} bots`);// -1 porque hay un bot
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
    else if(command === 'showmembers'){
        const server = client.guilds.cache.get('973655155297894420'); //id del server
// Fetch and get the list named 'members'
        let cnt = 1;
        server.members.fetch().then(members => {
            msg.channel.send(`Miembros del servidor: `)
            // Loop through every members
            members.forEach(member =>
            {
                if (member.id !== '973652617429397504'){
                    msg.channel.send(`${cnt}. ${member.user.username}`)
                    cnt++;
                }
            });
        });
    }
    else{
        msg.reply(`Aún no tengo el conocimiento necesario para entender esa orden ${msg.author}`);
    }
});

client.on("guildMemberAdd",async member => {
    users.push(member.user.id);
    const embed = new Discord.MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle('El servidor se expande')
        .setDescription(`Detectado en el servidor ${member.guild.name} nuevo usuario con nombre: ${member.user.username}. ¡Bienvenid@!`)
        .setThumbnail(member.user.avatarURL())
        .setFooter(member.user.username)
    member.client.channels.cache.get("975440633764392990").send({embeds:[embed]});
});

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GfDYgI.mCfvZC1JgkbbXVO4uwKJT-_pdLMCikfznZZQ9M");