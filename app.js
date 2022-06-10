// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot
//arreglar roles y mostrar personas baneadas en el server, añadir un invite y q te muestre tu avatar y numero random

const Discord = require("discord.js");

const client = new Discord.Client({
    intents: new Discord.Intents(32767)
});
const prefix = "$";
var blockedGuNa = [];
var blockedGuID = [];
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
    var posBlockServer = blockedGuNa.indexOf(msg.guild.id);
    if (posBlockServer !== -1 && blockedGuID[posBlockServer].includes(msg.author.id)){
        msg.reply(`${msg.author} parece que no eres digno de poder utilizarme`);
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    const numArgs = args.map(x => parseFloat(x));
    let userBlock;
    if (command === 'block' ||command === 'unblock' || command === 'unblockall'){
        userBlock = args.shift();
    }
    const server = msg.guild;
    let cnt = 1;
    switch (command){
        case 'hola': case 'hello':
            if (msg.member.permissions.has("ADMINISTRATOR")){ //permiso del admin
                msg.channel.send("Se rumorea que un admin anda cerca, tengan cuidado...");
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
                        msg.reply(`Mis registros indican que ${msg.author} es una gran persona, protéjanla a cualquier costo`);
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
            }else if (blockedGuNa.includes(msg.guild.id)){
                var positionBlocked = blockedGuNa.indexOf(msg.guild.id);
                if (!blockedGuID[positionBlocked].includes(userBlock)){
                    blockedGuID[positionBlocked].push(userBlock);
                    msg.channel.send(`Se ha bloqueado mi uso al/la usuari@ con ID: ${userBlock}`);
                }else{
                    msg.channel.send(`Est@ usuari@ (ID: ${userBlock}) ya estaba bloquead@, se ve que no perdonas... `);
                }
            }else{
                blockedGuNa.push(msg.guild.id);
                var actualBlocked = [userBlock];
                blockedGuID.push(actualBlocked);
                msg.channel.send(`Se ha bloqueado mi uso al/la usuari@ con ID: ${userBlock}`);
            }
            console.log(blockedGuID);
            console.log(blockedGuNa);
            break;
        case 'unblock':
            if (userBlock === undefined){
                msg.reply(`No has especificado la ID del usuario a desbloquear`);
            }else if (!blockedGuNa.includes(msg.guild.id)){
                msg.channel.send('No hay ninguna persona baneada en este server, es un lugar pacífico');
            }else{
                var positionBlocked = blockedGuNa.indexOf(msg.guild.id);
                if (blockedGuID[positionBlocked].indexOf(userBlock) === -1){
                    msg.channel.send(`No hay nadie con ID: ${userBlock} que esté bloquead@ en este server`);
                }else{
                    var positionUnblock = blockedGuID[positionBlocked].indexOf(userBlock);
                    blockedGuID[positionBlocked].splice(positionUnblock, 1);
                    if (blockedGuID[positionBlocked] === []){
                        blockedGuID.splice(positionBlocked, 1);
                        blockedGuNa.splice(positionBlocked, 1);
                    }
                    msg.channel.send(`Se ha desbloqueado mi uso a la persona con ID: ${userBlock}`);
                }
            }
            break;
        case 'unblockall':
            var positionBlocked = blockedGuNa.indexOf(msg.guild.id);
            if (positionBlocked !== -1){
                while (blockedGuID[positionBlocked].length > 0){
                    const user = blockedGuID[positionBlocked].pop();
                    msg.channel.send(`Se ha desbloqueado mi uso al usuario con ID: ${user} en el servidor: ${msg.guild.name}`);
                }
                blockedGuID.splice(positionBlocked, 1);
                blockedGuNa.splice(positionBlocked, 1);
            }else{
                msg.channel.send('No hay ninguna persona baneada en este server, es un lugar pacífico');
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
        case 'help':
            const helpCommand = new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .setTitle('Lista de posibles comandos del bot:\n')
                .setDescription('\n`$hola` | `$hello` :arrow_right: Saludo del bot\n* `$sum [numero1] [numero2] ...` :arrow_right: Suma todos los números que escribas\n* `$sub [numero1] [numero2] ...` :arrow_right: Resta todos los números que escribas\n* `$mul [numero1] [numero2] ...` :arrow_right: Multiplica todos los números que escribas\n* `$div [numero1] [numero2] ...` :arrow_right: Divide todos los números que escribas\n`$picture` :arrow_right: Muestra la foto que tiene el bot de perfil\n`$server` :arrow_right: Muestra la información del servidor\n`$user` :arrow_right: Muestra la información del propio usuario\n`$block [id de un usuario]` :arrow_right: Prohíbe al usuario con esa id utilizar este bot\n`$unblock [id de un usuario]` :arrow_right: Permite al usuario con esa id utilizar este bot\n`$unblockall`  :arrow_right: Permite a todos los usuarios bloqueados volver a utilizar este bot\n`$showmembers` :arrow_right: Muestra los integrantes del servidor\n`$myroles` :arrow_right: Muestra los roles que tienes\n`$kingdom` :arrow_right: Muestra los servidores que tienen añadido este bot\n\n* (números separados por espacios)')
            msg.channel.send({embeds:[helpCommand]});
            break;
        case 'random':
            if(args.length !== 2 || isNaN(args[0]) || isNaN(args[1]) || numArgs[0] >= numArgs[1]){
                msg.channel.send("Solo puedes poner dos números, primero el menor número y después el mayor");
            }else{
                console.log(numArgs);
                const randomNum = Math.floor(Math.random()*(numArgs[1]-numArgs[0]+1)+(numArgs[0]));
                console.log(randomNum);
                msg.reply(`Número aleatorio obtenido: ${randomNum}`);
            }
            break;
        default:
            const notCommand = new Discord.MessageEmbed()
                .setColor('RED')
                .setTimestamp()
                .setTitle(':x: Aún no tengo el conocimiento necesario para entender esa orden')
                .setDescription(`Prueba a usar otro comando o escribe  $help  para descubrir mis secretos`)
                .setFooter(msg.author.username)
            msg.reply({embeds:[notCommand]});
    }
});

client.on("guildMemberAdd",member => {
    users.push(member.user.id);
    const newMember = new Discord.MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTimestamp()
        .setTitle('El servidor se expande')
        .setDescription(`Detectado en el servidor ${member.guild.name} nuevo usuario con nombre: ${member.user.username}. ¡Bienvenid@!`)
        .setThumbnail(member.user.avatarURL())
        .setFooter(member.user.username)
    const channel = member.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('bienvenida') ||  channel.name.toLowerCase().includes('bienvenido') || channel.name.toLowerCase().includes('bienvenidos') || channel.name.toLowerCase().includes('bienvenidas') || channel.name.toLowerCase().includes('gente nueva') || channel.name.toLowerCase().includes('nuevos miembros') || channel.name.toLowerCase().includes('new members') || channel.name.toLowerCase().includes('welcome'))
    if (channel !== undefined){
        channel.send({embeds:[newMember]});
    }
});

client.on("guildMemberRemove", (member) => {
    const indexUser = users.indexOf(member.user.id);
    users.splice(indexUser, 1);
    const deleteMember = new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('La expansión no se detendrá')
        .setColor('DARK_RED')
        .setDescription(`Se ha añadido en el servidor ${member.guild.name} un nuevo cartel de WANTED para el usuario: ${member.user.username}.`)
        .setThumbnail(member.user.avatarURL())
        .setFooter(member.user.username)
    const channel = member.guild.channels.cache
        .filter((ch) => ch.type === 'GUILD_TEXT')
        .find(
            (channel => channel.name.toLowerCase().includes('general') ||  channel.name.toLowerCase().includes('despedidas') || channel.name.toLowerCase().includes('despedido') || channel.name.toLowerCase().includes('eliminados'))
        );
    if (channel !== undefined){
        console.log(channel);
        channel.send({embeds:[deleteMember]});
    }
});

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg");