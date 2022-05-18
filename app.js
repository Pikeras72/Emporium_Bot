// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot
//arreglar roles y arreglar lo de que no se muestra el numero de bots del server al hacer $server y array de baneos por server

const Discord = require("discord.js");

const client = new Discord.Client({
    intents: new Discord.Intents(32767)
});
const prefix = "$";
const blockedUsers = [];//añadir los ids de los bloqueados
const users = [];//añadir los ids de los usuarios

client.on('ready', () => {
    console.log(client.user.tag + " comienza su camino");
    client.user.setStatus('idle'); // online, idle, invisible, dnd
    client.user.setActivity("Discovering the unknown...");
    console.log('Bot status: ',client.user.presence.status);
});

client.on("message", msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (blockedUsers.includes(msg.author.id)){msg.reply(`${msg.author} no eres digno de poder utilizarme`);return;}
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    const numArgs = args.map(x => parseFloat(x));
    const userBlock = args.shift();
    const server = msg.guild;
    let cnt = 1;
    switch (command){
        case 'hola' || 'hello':
            if (msg.member.permissions.has("ADMINISTRATOR")){ //permiso del admin
                msg.channel.send("¡Aviso! admin detectado, anden con cuidado...");
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
            break;
        case 'sum':
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
            break;
        case 'sub':
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
            break;
        case 'mul':
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
            break;
        case 'div':
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
            break;
        case 'picture':
            msg.channel.send('https://mymodernmet.com/wp/wp-content/uploads/2019/10/nasa-black-hole-visualization-2.gif');
            break;
        case 'server':
            server.members.fetch().then(members => {
                members.forEach(member =>
                {
                    if (!member.user.bot){
                        cnt++;
                    }
                });
            });
            msg.reply(`Nombre del server: ${msg.guild.name}\nNumero de integrantes: ${cnt} miembros y ${server.memberCount-cnt} bots`);// -1 porque hay un bot
            break;
        case 'user':
            msg.reply(`Tu tag: ${msg.author.tag}\nTu ID: ${msg.author.id}`);
            break;
        case 'block':
            if (userBlock === undefined){
                msg.channel.send(`No has especificado la ID del usuario a bloquear`);
            }else{
                blockedUsers.push(userBlock);
                msg.channel.send(`Se ha bloqueado mi uso al usuario con ID: ${userBlock}`);
            }
            break;
        case 'unblock':
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
            break;
        case 'unblockall':
            while (blockedUsers.length > 0){
                const user = blockedUsers.pop();
                msg.channel.send(`Se ha desbloqueado mi uso al usuario con ID: ${user}`);
            }
            break;
        case 'myroles':
            msg.reply(`Tus roles: ${msg.member.roles}`);
            break;
        case 'showmembers':
            server.members.fetch().then(members => {
                msg.channel.send(`Miembros del servidor: `)
                // Loop through every members
                members.forEach(member =>
                {
                    if (member.id !== client.user.id){
                        msg.channel.send(`${cnt}. ${member.user.username}`)
                        cnt++;
                    }
                });
            });
            break;
        case 'kingdom':
            msg.reply(`Mundos conquistados: ${client.guilds.cache.size}`);
            break;
        default:
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
    const channel = client.channels.cache.find(channel => channel.name.toLowerCase().includes('bienvenida') ||  channel.name.toLowerCase().includes('bienvenido') || channel.name.toLowerCase().includes('bienvenidos') || channel.name.toLowerCase().includes('bienvenidas') || channel.name.toLowerCase().includes('gente nueva') || channel.name.toLowerCase().includes('nuevos miembros') || channel.name.toLowerCase().includes('new members') || channel.name.toLowerCase().includes('welcome'))
    if (channel !== undefined){
        channel.send({embeds:[embed]});
    }
});

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg");