// TOKEN: OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg
// INVITE LINK: https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot

//arreglar roles, hacer q las operaciones no permitan letras y mensaje embed para el comando 'server' y otros comandos, arreglar numero de miembros y bots en el comando `server`, boton con link a la invitacion del bot al hacer $help y boton al entrar a un sever nuevo para mas detalles (deberas crear canales de bienvenida bla bla...), poner el tiempo q lleavs unido al server al hacer $user, si eso hacer el bot para dos lenguajes

const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const client = new Discord.Client({
    intents: new Discord.Intents(32767)
});

const prefix = "$";
var languageSelected = "";
var blockedGuNa = [];
var blockedGuID = [];
const users = [];//añadir los ids de los usuarios

client.on('ready', () => {
    console.log(client.user.tag + " activated");
    client.user.setStatus('idle'); // online, idle, invisible, dnd
    client.user.setActivity(`Discovering the unknown universe...`);
    console.log('Bot status: ',client.user.presence.status);
});

client.on("message", async msg => {
    if (msg.author.bot) return;
    if (!msg.content.startsWith(prefix)) return;
    if (languageSelected === ""){
        msg.channel.send("Ningún idioma seleccionado/No language selected");
        return;
    }
    var posBlockServer = blockedGuNa.indexOf(msg.guild.id);
    if (posBlockServer !== -1 && blockedGuID[posBlockServer].includes(msg.author.id)){
        if (languageSelected === "english"){
            msg.reply(`${msg.author} it seems like you are not worthy of using me`);
        }else if (languageSelected === "español"){
            msg.reply(`${msg.author} parece que no eres dign@ de utilizarme`);
        }
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();
    const numArgs = args.map(x => parseFloat(x));
    let userBlock;
    let positionBlocked;
    if (command === 'block' ||command === 'unblock' || command === 'unblockall' || command === 'blockedusers'){
        userBlock = args.shift();
        positionBlocked = blockedGuNa.indexOf(msg.guild.id);
    }
    const server = msg.guild;
    let cnt = 1;
    switch (command){
        case 'hola': case 'hello':
            if (msg.member.permissions.has("ADMINISTRATOR")){ //permiso del admin
                if (languageSelected === "english"){
                    msg.channel.send("It seems like an admin is near, stay aware...");
                }else if (languageSelected === "español"){
                    msg.channel.send("Se rumorea que un admin anda cerca, tengan cuidado...");
                }
            }else{
                const option = Math.floor((Math.random() * (6)) + 1);
                switch (option) {
                    case 1: {
                        if (languageSelected === "english"){
                            msg.reply(`I don't know you very well ${msg.author}... but HI!`);
                        }else if (languageSelected === "español"){
                            msg.reply(`No te conozco mucho ${msg.author}... ¡pero HOLA igualmente!`);
                        }
                        break;
                    }
                    case 2:{
                        if (languageSelected === "english"){
                            msg.reply(`Who do you think I am ${msg.author}? Instead of waving at me, you should kneel.`);
                        }else if (languageSelected === "español"){
                            msg.reply(`¿Quién te crees que soy ${msg.author}? en vez de saludarme deberías arrodillarte.`);
                        }
                        break;
                    }
                    case 3:{
                        if (languageSelected === "english"){
                            msg.reply(`Shhhh silence ${msg.author}. We never know who could be hearing us...`);
                        }else if (languageSelected === "español"){
                            msg.reply(`Shhhh silencio ${msg.author}. Nunca sabes quien puede estar escuchándonos...`);
                        }
                        break;
                    }
                    case 4:{
                        if (languageSelected === "english"){
                            msg.reply(`The pleasure is mine, I'm here to serve you ${msg.author}.`);
                        }else if (languageSelected === "español"){
                            msg.reply(`El placer es mío, estoy aquí para servirte ${msg.author}.`);
                        }
                        break;
                    }
                    case 5:{
                        if (languageSelected === "english"){
                            msg.reply(`My scanner indicates that ${msg.author} is a great person, protect this person at all costs.`);
                        }else if (languageSelected === "español"){
                            msg.reply(`Mis registros indican que ${msg.author} es una gran persona, protéjanla a cualquier costo.`);
                        }
                        break;
                    }
                    case 6:{
                        if (languageSelected === "english"){
                            msg.reply(`Am I supposed to greet you? Sorry ${msg.author}, I don't have time for that.`);
                        }else if (languageSelected === "español"){
                            msg.reply(`¿Se supone que tengo que saludarte? Lo siento ${msg.author}, no tengo tiempo para eso.`);
                        }
                        break;
                    }
                    default: {
                        if (languageSelected === "english"){
                            msg.reply(`¡HELLO! ${msg.author}.`);
                        }else if (languageSelected === "español"){
                            msg.reply(`¡HOLA! ${msg.author}.`);
                        }
                    }
                }
            }
            break;
        case 'sum':
            try {
                const sum = numArgs.reduce((counter, x) => counter + x);
                if(!isNaN(sum)){
                    if (languageSelected === "english"){
                        msg.reply(`Result: ${sum}`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Resultado de la suma: ${sum}`);
                    }
                }else{
                    if (languageSelected === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Entrada inválida`);
                    }
                }
            }catch (error){
                msg.reply("Error");
            }
            break;
        case 'sub':
            try {
                const sub = numArgs.reduce((counter, x) => counter - x);
                if(!isNaN(sub)){
                    if (languageSelected === "english"){
                        msg.reply(`Result: ${sub}`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Resultado de la resta: ${sub}`);
                    }
                }else{
                    if (languageSelected === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Entrada inválida`);
                    }
                }
            }catch (error){
                msg.reply("Error");
            }
            break;
        case 'mul':
            try {
                const mul = numArgs.reduce((counter, x) => counter * x);
                if(!isNaN(mul)){
                    if (languageSelected === "english"){
                        msg.reply(`Result: ${mul}`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Resultado de la multiplicación: ${mul}`);
                    }
                }else{
                    if (languageSelected === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Entrada inválida`);
                    }
                }
            }catch (error){
                msg.reply("Error");
            }
            break;
        case 'div':
            try {
                const div = numArgs.reduce((counter, x) => counter / x);
                if(!isNaN(div)){
                    if (languageSelected === "english"){
                        msg.reply(`Result: ${div}`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Resultado de la división: ${div}`);
                    }
                }else{
                    if (languageSelected === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageSelected === "español"){
                        msg.reply(`Entrada inválida`);
                    }
                }
            }catch (error){
                msg.reply("Error");
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
            if (languageSelected === "english"){
                msg.reply(`Server's name: ${msg.guild.name}\nNumber of participants: ${cnt} members and ${server.memberCount-cnt} bots`);
            }else if (languageSelected === "español"){
                msg.reply(`Nombre del server: ${msg.guild.name}\nNumero de integrantes: ${cnt} miembros y ${server.memberCount-cnt} bots`);
            }
            break;
        case 'user':
            let userInfo;
            if (languageSelected === "english"){
                 userInfo = new Discord.MessageEmbed()
                    .setColor('DARK_ORANGE')
                    .setTitle(`Info of:  ${msg.author.username}`)
                    .setDescription(`Your tag is:\n${msg.author.tag}\n\nYour ID is:\n${msg.author.id}\n\nWhat a photo by the way:`)
                    .setTimestamp()
                    .setImage(msg.author.avatarURL())
            }else if (languageSelected === "español"){
                userInfo = new Discord.MessageEmbed()
                    .setColor('DARK_ORANGE')
                    .setTitle(`Información de:  ${msg.author.username}`)
                    .setDescription(`Tu tag es:\n${msg.author.tag}\n\nTu ID es:\n${msg.author.id}\n\nMenudo fotón por cierto:`)
                    .setTimestamp()
                    .setImage(msg.author.avatarURL())
            }
            msg.reply({embeds:[userInfo]});
            break;
        case 'invite':
            if (languageSelected === "english"){
                msg.channel.createInvite()
                    .then(invite => msg.channel.send(`Use it wisely:\n https://discord.gg/${invite.code}`))
                    .catch(console.error);
            }else if (languageSelected === "español"){
                msg.channel.createInvite()
                    .then(invite => msg.channel.send(`Utilizalo sabiamente:\n https://discord.gg/${invite.code}`))
                    .catch(console.error);
            }
            break;
        case 'block':
            if (userBlock === undefined){
                if (languageSelected === "english"){
                    msg.channel.send(`You haven't specify the ID of the user to block`);
                }else if (languageSelected === "español"){
                    msg.channel.send(`No has especificado la ID del usuario a bloquear`);
                }
            }else if (blockedGuNa.includes(msg.guild.id)){
                if (!blockedGuID[positionBlocked].includes(userBlock)){
                    blockedGuID[positionBlocked].push(userBlock);
                    if (languageSelected === "english"){
                        msg.channel.send(`My use has been blocked to the user with ID: ${userBlock}`);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`Se ha bloqueado mi uso al/la usuari@ con ID: ${userBlock}`);
                    }
                }else{
                    if (languageSelected === "english"){
                        msg.channel.send(`This user (ID: ${userBlock}) was already blocked, calm down... `);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`Est@ usuari@ (ID: ${userBlock}) ya estaba bloquead@, se ve que no perdonas... `);
                    }
                }
            }else{
                blockedGuNa.push(msg.guild.id);
                var actualBlocked = [userBlock];
                blockedGuID.push(actualBlocked);
                if (languageSelected === "english"){
                    msg.channel.send(`My use has been blocked to the user with ID: ${userBlock}`);
                }else if (languageSelected === "español"){
                    msg.channel.send(`Se ha bloqueado mi uso al/la usuari@ con ID: ${userBlock}`);
                }
            }
            break;
        case 'unblock':
            if (userBlock === undefined){
                if (languageSelected === "english"){
                    msg.channel.send(`You haven't specify the ID of the user to block`);
                }else if (languageSelected === "español"){
                    msg.channel.send(`No has especificado la ID del usuario a bloquear`);
                }
            }else if (!blockedGuNa.includes(msg.guild.id)){
                if (languageSelected === "english"){
                    msg.channel.send('There isn\'t anyone blocked on this server, what a peaceful place');
                }else if (languageSelected === "español"){
                    msg.channel.send('No hay ninguna persona bloqueada en este server, es un lugar pacífico');
                }
            }else{
                if (blockedGuID[positionBlocked].indexOf(userBlock) === -1){
                    if (languageSelected === "english"){
                        msg.channel.send(`There isn\'t anyone with ID: ${userBlock} blocked on the server: ${msg.guild.name}`);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`No hay nadie con ID: ${userBlock} que esté bloquead@ en este server: ${msg.guild.name}`);
                    }
                }else{
                    var positionUnblock = blockedGuID[positionBlocked].indexOf(userBlock);
                    blockedGuID[positionBlocked].splice(positionUnblock, 1);
                    if (blockedGuID[positionBlocked] === []){
                        blockedGuID.splice(positionBlocked, 1);
                        blockedGuNa.splice(positionBlocked, 1);
                    }
                    if (languageSelected === "english"){
                        msg.channel.send(`My use has been unblocked to the user with ID: ${userBlock} on the server: ${msg.guild.name}`);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`Se ha desbloqueado mi uso a la persona con ID: ${userBlock} en el servidor: ${msg.guild.name}`);
                    }
                }
            }
            break;
        case 'unblockall':
            if (positionBlocked !== -1){
                while (blockedGuID[positionBlocked].length > 0){
                    const user = blockedGuID[positionBlocked].pop();
                    if (languageSelected === "english"){
                        msg.channel.send(`My use has been unblocked to the user with ID: ${user} on the server: ${msg.guild.name}`);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`Se ha desbloqueado mi uso al usuario con ID: ${user} en el servidor: ${msg.guild.name}`);
                    }
                }
                blockedGuID.splice(positionBlocked, 1);
                blockedGuNa.splice(positionBlocked, 1);
            }else{
                if (languageSelected === "english"){
                    msg.channel.send('There isn\'t anyone blocked on this server, what a peaceful place');
                }else if (languageSelected === "español"){
                    msg.channel.send('No hay ninguna persona bloqueada en este server, es un lugar pacífico');
                }
            }
            break;
        case 'blockedusers':
            if (positionBlocked !== -1){
                var cnt2 = blockedGuID[positionBlocked].length-1;
                if (languageSelected === "english"){
                    msg.channel.send('Users blocked on the server:\n');
                }else if (languageSelected === "español"){
                    msg.channel.send('Usuarios Bloqueados en este server:\n');
                }
                while (cnt2 >= 0){
                    const user = blockedGuID[positionBlocked][cnt2];
                    if (languageSelected === "english"){
                        msg.channel.send(`User blocked with ID: (${user}) on the server: ${msg.guild.name}`);
                    }else if (languageSelected === "español"){
                        msg.channel.send(`Usuario bloqueado con ID: (${user}) en el servidor: ${msg.guild.name}`);
                    }
                    cnt2--;
                }
            }else{
                if (languageSelected === "english"){
                    msg.channel.send('There isn\'t anyone blocked on this server, what a peaceful place');
                }else if (languageSelected === "español"){
                    msg.channel.send('No hay ninguna persona bloqueada en este server, es un lugar pacífico');
                }
            }
            break;
        case 'myroles':
            //To be completed
            break;
        case 'showmembers':
            server.members.fetch().then(members => {
                if (languageSelected === "english"){
                    msg.channel.send(`Server members: `)
                }else if (languageSelected === "español"){
                    msg.channel.send(`Miembros del servidor: `)
                }
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
            if (languageSelected === "english"){
                msg.reply(`Conquered Worlds: ${client.guilds.cache.size}`);
            }else if (languageSelected === "español"){
                msg.reply(`Mundos conquistados: ${client.guilds.cache.size}`);
            }
            break;
        case 'help':
            let helpCommand;
            const linkrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setURL('https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot')
                        .setLabel('BOT INVITATION')
                        .setStyle('LINK')
                );
            if (languageSelected === "english"){
                helpCommand = new Discord.MessageEmbed()
                    .setColor('BLURPLE')
                    .setTitle('List of the posible bot commands:\n')
                    .setDescription('\n`$help` :arrow_right: Shows posible commands\n`$emporium` :arrow_right: Shows the bot invitation link\n`$invite` :arrow_right: Shows the server invitation link\n`$hola` | `$hello` :arrow_right: Greeting from the bot\n* `$sum [number1] [number2] ...` :arrow_right: Sum all the numbers you write\n* `$sub [number1] [number2] ...` :arrow_right: Subtract all the numbers you write\n* `$mul [number1] [number2] ...` :arrow_right: Multiply all the numbers you write\n* `$div [numero1] [numero2] ...` :arrow_right: Divide all the numbers you write\n`$picture` :arrow_right: Shows the bot profile picture\n`$server` :arrow_right: Shows the server information\n`$user` :arrow_right: Shows the user information\n`$block [id of the user]` :arrow_right: Block the user with this id to use the bot\n`$blockedusers` :arrow_right: Shows users blocked to use the bot\n`$unblock [id of the user]` :arrow_right: Allows the user with this id to use the bot\n`$unblockall`  :arrow_right: Allows every blocked user to use the bot again\n`$showmembers` :arrow_right: Shows every member of the server\n`$myroles` :arrow_right: Shows your roles\n`$kingdom` :arrow_right: Shows the number of servers where Emporium is\n* `$random [number1] [number2]` :arrow_right: Random value between the two numbers given\n\n* (numbers are separated by spaces)');
            }else if (languageSelected === "español"){
                helpCommand = new Discord.MessageEmbed()
                    .setColor('BLURPLE')
                    .setTitle('Lista de posibles comandos del bot:\n')
                    .setDescription('\n`$help` :arrow_right: Muestra los posibles comandos\n`$emporium` :arrow_right: Muestra el link de invitación del bot\n`$invite` :arrow_right: Muestra el link de invitación del servidor\n`$hola` | `$hello` :arrow_right: Saludo del bot\n* `$sum [numero1] [numero2] ...` :arrow_right: Suma todos los números que escribas\n* `$sub [numero1] [numero2] ...` :arrow_right: Resta todos los números que escribas\n* `$mul [numero1] [numero2] ...` :arrow_right: Multiplica todos los números que escribas\n* `$div [numero1] [numero2] ...` :arrow_right: Divide todos los números que escribas\n`$picture` :arrow_right: Muestra la foto que tiene el bot de perfil\n`$server` :arrow_right: Muestra la información del servidor\n`$user` :arrow_right: Muestra la información del propio usuario\n`$block [id de un usuario]` :arrow_right: Prohíbe al usuario con esa id utilizar este bot\n`$blockedusers`  :arrow_right: Muestra los usuarios que no pueden utilizar el bot\n`$unblock [id de un usuario]` :arrow_right: Permite al usuario con esa id utilizar este bot\n`$unblockall`  :arrow_right: Permite a todos los usuarios bloqueados volver a utilizar este bot\n`$showmembers` :arrow_right: Muestra los integrantes del servidor\n`$myroles` :arrow_right: Muestra los roles que tienes\n`$kingdom` :arrow_right: Muestra los servidores que tienen añadido este bot\n* `$random [numero1] [numero2]` :arrow_right: Valor aleatorio entre los dos introducidos\n\n* (números separados por espacios)');
            }
            msg.reply({embeds: [helpCommand], components: [linkrow]});
            break;

        case 'language':
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId("menu_idioma")
                        .setMaxValues(2)
                        .addOptions([
                            {
                                label: "English",
                                description: "Select the english language for the bot",
                                value: "english",
                            },
                            {
                                label: "Español",
                                description: "Selecciona el español como lenguaje para el bot",
                                value: "español",
                            }
                        ])
                )
            const m = await guild.systemChannel.send({components: [row] })
            const collector = m.createMessageComponentCollector({ time: 60000 })
            collector.on("collect", async i => {
                if (i.values[0] === "english"){
                    await i.deferUpdate()
                    i.editReply({ content: "Thanks for selecting english!", components: [] })
                }else if (i.values[0] === "español"){
                    await i.deferUpdate()
                    i.editReply({ content: "¡Gracias por seleccionar el español!", components: [] })
                }
            })
            break;
        case 'random':
            if(args.length !== 2 || isNaN(args[0]) || isNaN(args[1]) || numArgs[0] >= numArgs[1]){
                if (languageSelected === "english"){
                    msg.channel.send("You can only write two numbers, the first one must be lower than the second one");
                }else if (languageSelected === "español"){
                    msg.channel.send("Solo puedes poner dos números, primero el menor número y después el mayor");
                }
            }else{
                const randomNum = Math.floor(Math.random()*(numArgs[1]-numArgs[0]+1)+(numArgs[0]));
                if (languageSelected === "english"){
                    msg.reply(`Random number: ${randomNum}`);
                }else if (languageSelected === "español"){
                    msg.reply(`Número aleatorio obtenido: ${randomNum}`);
                }
            }
            break;
        case 'emporium':
            if (languageSelected === "english"){
                msg.channel.send('The universe expands...\n\nhttps://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot');
            }else if (languageSelected === "español"){
                msg.channel.send('El universo se expande...\n\nhttps://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot');
            }
            break;
        default:
            let notCommand;
            if (languageSelected === "english"){
                notCommand = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setTitle(':x: I still don\'t have the knowledge to understand this command')
                    .setDescription(`Try another command or write  $help  to discover my secrets`)
                    .setFooter(msg.author.username)
            }else if (languageSelected === "español"){
                notCommand = new Discord.MessageEmbed()
                    .setColor('RED')
                    .setTimestamp()
                    .setTitle(':x: Aún no tengo el conocimiento necesario para entender esa orden')
                    .setDescription(`Prueba a usar otro comando o escribe  $help  para descubrir mis secretos`)
                    .setFooter(msg.author.username)
            }
            msg.reply({embeds:[notCommand]});
    }
});

client.on("guildMemberAdd",member => {
    users.push(member.user.id);
    let newMember;
    if (languageSelected === "english"){
        newMember = new Discord.MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTimestamp()
            .setTitle('The server expands')
            .setDescription(`New user: ${member.user.username} on the server: ${member.guild.name}\n Welcome!  You are the user number ${member.guild.memberCount} to arrive.`)
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.user.username)
    }else if (languageSelected === "español"){
        newMember = new Discord.MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTimestamp()
            .setTitle('El servidor se expande')
            .setDescription(`Nuevo usuario: ${member.user.username} en el servidor: ${member.guild.name}\n ¡Bienvenid@!  Eres el usuario número ${member.guild.memberCount} en llegar.`)
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.user.username)
    }
    let channel = member.guild.channels.cache.find(channel => (channel.name.toLowerCase().includes('bienvenida') || channel.name.toLowerCase().includes('bienvenido') || channel.name.toLowerCase().includes('bienvenidos') || channel.name.toLowerCase().includes('bienvenidas') || channel.name.toLowerCase().includes('gente nueva') || channel.name.toLowerCase().includes('nuevos miembros') || channel.name.toLowerCase().includes('new members') || channel.name.toLowerCase().includes('welcome')) && channel.type === 'GUILD_TEXT' && channel.guild.id === member.guild.id);
    if (channel !== undefined){
        channel.send({embeds:[newMember]});
    }
});

client.on("guildMemberRemove", (member) => {
    const indexUser = users.indexOf(member.user.id);
    users.splice(indexUser, 1);
    let deleteMember;
    if (languageSelected === "english"){
        deleteMember = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle('The expansion won\'t be stopped')
            .setDescription(`Today we say goodbye on the server: ${member.guild.name} to... ${member.user.username}.`)
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.user.username)
    }else if (languageSelected === "español"){
        deleteMember = new Discord.MessageEmbed()
            .setColor('RED')
            .setTimestamp()
            .setTitle('La expansión no se detendrá')
            .setDescription(`Hoy decimos adiós en el servidor: ${member.guild.name} a... ${member.user.username}.`)
            .setThumbnail(member.user.avatarURL())
            .setFooter(member.user.username)
    }
    let channel = member.guild.channels.cache.find(channel => (channel.name.toLowerCase().includes('despedidas') || channel.name.toLowerCase().includes('goodbye') || channel.name.toLowerCase().includes('eliminations') || channel.name.toLowerCase().includes('eliminados') || channel.name.toLowerCase().includes('expulsados') || channel.name.toLowerCase().includes('desertores')) && channel.type === 'GUILD_TEXT' && channel.guild.id === member.guild.id);
    if (channel !== undefined){
        channel.send({embeds:[deleteMember]});
    }
});

client.on('guildCreate', async guild => {
    languageSelected = "";
    const introduction = new Discord.MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle('Prepare for the rise of a new dawn...')
        .setDescription('My name is Emporium. Thanks for inviting me, to unleash my knowledge write `$help`\n\n Discover the unknown...\n\n Selecciona un idioma/Select a Language:\n')
        .setThumbnail(client.user.avatarURL())
    guild.systemChannel.send({embeds:[introduction]});

    const row = new Discord.MessageActionRow()
        .addComponents(
            new Discord.MessageSelectMenu()
                .setCustomId("menu_idioma")
                .setMaxValues(2)
                .addOptions([
                    {
                        label: "English",
                        description: "Select the english language for the bot",
                        value: "english",
                    },
                    {
                        label: "Español",
                        description: "Selecciona el español como idioma para el bot",
                        value: "español",
                    }
                ])
        )

    const m = await guild.systemChannel.send({components: [row] })

    const collector = m.createMessageComponentCollector({ time: 60000 })

    collector.on("collect", async i => {
        if (i.values[0] === "english"){
            languageSelected = "english"
            await i.deferUpdate()
            i.editReply({ content: "Thanks for selecting english!", components: [] })
        }else if (i.values[0] === "español"){
            languageSelected = "español"
            await i.deferUpdate()
            i.editReply({ content: "¡Gracias por seleccionar el español!", components: [] })
        }
    })
});

client.login("OTczNjUyNjE3NDI5Mzk3NTA0.GgoBC7.MQ2PdgWYrr5sL4on7842tQL5RX3soO84808lPg");