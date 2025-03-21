require('dotenv').config();

const { Client, GatewayIntentBits, Partials, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder, PermissionsBitField } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User]
});

const prefix = "$";
const blockedGuID = [];
const languageGu = [];
const guildIDS = [];
const users = [];

client.once("ready", () => {
    console.log(client.user.tag + " activated");
    client.user.setPresence({
        status: "idle",
        activities: [{ name: "Discovering the unknown universe..." }]
    });
});

client.on("messageCreate", async msg => {
    if (msg.author.bot || !msg.content.startsWith(prefix)) return;

    var posBlockServer = guildIDS.indexOf(msg.guild.id);
    if (posBlockServer !== -1 && blockedGuID[posBlockServer].includes(msg.author.id)){
        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
            msg.reply(`${msg.author} it seems like you are not worthy of using me`);
        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
            msg.reply(`${msg.author} parece que no eres dign@ de utilizarme`);
        }
        return;
    }
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase();
    const numArgs = args.map(x => parseFloat(x));
    let userBlock;
    let positionBlocked;
    if (command === 'block' ||command === 'unblock' || command === 'unblockall' || command === 'blockedusers'){
        userBlock = args.shift();
        positionBlocked = guildIDS.indexOf(msg.guild.id);
    }
    const server = msg.guild;
    
    if (!languageGu[guildIDS.indexOf(msg.guild.id)]) {
        msg.channel.send("Ningún idioma seleccionado/No language selected");
        command = 'language'
    }

    switch (command){
        case 'hola': case 'hello':
            if (msg.member.permissions.has("ADMINISTRATOR")){ //permiso del admin
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                    msg.channel.send("It seems like an admin is near, stay aware...");
                }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                    msg.channel.send("Se rumorea que un admin anda cerca, tengan cuidado...");
                }
            }else{
                const option = Math.floor((Math.random() * (6)) + 1);
                switch (option) {
                    case 1: {
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`I don't know you very well ${msg.author}... but HI!`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`No te conozco mucho ${msg.author}... ¡pero HOLA igualmente!`);
                        }
                        break;
                    }
                    case 2:{
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`Who do you think I am ${msg.author}? Instead of waving at me, you should kneel.`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`¿Quién te crees que soy ${msg.author}? en vez de saludarme deberías arrodillarte.`);
                        }
                        break;
                    }
                    case 3:{
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`Shhhh silence ${msg.author}. We never know who could be hearing us...`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`Shhhh silencio ${msg.author}. Nunca sabes quien puede estar escuchándonos...`);
                        }
                        break;
                    }
                    case 4:{
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`The pleasure is mine, I'm here to serve you ${msg.author}.`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`El placer es mío, estoy aquí para servirte ${msg.author}.`);
                        }
                        break;
                    }
                    case 5:{
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`My scanner indicates that ${msg.author} is a great person, protect this person at all costs.`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`Mis registros indican que ${msg.author} es una gran persona, protéjanla a cualquier costo.`);
                        }
                        break;
                    }
                    case 6:{
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`Am I supposed to greet you? Sorry ${msg.author}, I don't have time for that.`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                            msg.reply(`¿Se supone que tengo que saludarte? Lo siento ${msg.author}, no tengo tiempo para eso.`);
                        }
                        break;
                    }
                    default: {
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                            msg.reply(`¡HELLO! ${msg.author}.`);
                        }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
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
                    let sumRes;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        sumRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Result:** `)
                            .setDescription(`${sum}`)
                            .setTimestamp()
                        msg.reply({embeds: [sumRes]} );
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                        sumRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Resultado de la suma:** `)
                            .setDescription(`${sum}`)
                            .setTimestamp()
                        msg.reply({embeds: [sumRes]} );
                    }
                }else{
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
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
                    let subRes;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        subRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Result:** `)
                            .setDescription(`${sub}`)
                            .setTimestamp()
                        msg.reply({embeds: [subRes]} );
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                        subRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Resultado de la resta:** `)
                            .setDescription(`${sub}`)
                            .setTimestamp()
                        msg.reply({embeds: [subRes]} );
                    }
                }else{
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
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
                    let mulRes;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        mulRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Result:** `)
                            .setDescription(`${mul}`)
                            .setTimestamp()
                        msg.reply({embeds: [mulRes]} );
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                        mulRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Resultado de la multiplicación:** `)
                            .setDescription(`${mul}`)
                            .setTimestamp()
                        msg.reply({embeds: [mulRes]} );
                    }
                }else{
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
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
                    let divRes;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        divRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Result:** `)
                            .setDescription(`${div}`)
                            .setTimestamp()
                        msg.reply({embeds: [divRes]} );
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                        divRes = new Discord.MessageEmbed()
                            .setColor('DARK_ORANGE')
                            .setTitle(`**Resultado de la división:** `)
                            .setDescription(`${div}`)
                            .setTimestamp()
                        msg.reply({embeds: [divRes]} );
                    }
                }else{
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                        msg.reply(`Invalid numbers`);
                    }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
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
            let cnt = 0; // Variable para contar los miembros no bots
            server.members.fetch().then(members => {
                members.forEach(member =>
                {
                    if (!member.user.bot){
                        cnt++;
                    }
                });
                let infoServer;
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                    infoServer = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`**Server's Info:**`)
                        .setDescription(`\n**Server's name:** ${msg.guild.name}\n\n**Number of participants:** ${cnt} members and ${msg.guild.memberCount - cnt} bots`)
                        .setTimestamp();
                } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                    infoServer = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`**Información del servidor:**`)
                        .setDescription(`\n**Nombre del servidor:** ${msg.guild.name}\n\n**Número de integrantes:** ${cnt} miembros y ${msg.guild.memberCount - cnt} bots`)
                        .setTimestamp();
                }
            
                // Enviar el mensaje después de procesar los miembros
                msg.reply({ embeds: [infoServer] });
            }).catch(err => {
                console.error('Error al obtener los miembros:', err);
            });
            break;
        case 'user':
            let userInfo;
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                userInfo = new EmbedBuilder()
                    .setColor('DarkOrange')
                    .setTitle(`**Info of:**  ${msg.author.username}`)
                    .setDescription(`**Your tag is:**\n${msg.author.tag}\n\n**Your ID is:**\n${msg.author.id}\n\n**What a photo by the way:**`)
                    .setTimestamp()
                    .setImage(msg.author.displayAvatarURL({ dynamic: true }));
            } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                userInfo = new EmbedBuilder()
                    .setColor('DarkOrange')
                    .setTitle(`**Información de:**  ${msg.author.username}`)
                    .setDescription(`**Tu tag es:**\n${msg.author.tag}\n\n**Tu ID es:**\n${msg.author.id}\n\n**Menudo fotón por cierto:**`)
                    .setTimestamp()
                    .setImage(msg.author.displayAvatarURL({ dynamic: true }));
            }
            msg.reply({ embeds: [userInfo] });
            break
        case 'invite':
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                msg.channel.createInvite()
                    .then(invite => msg.channel.send(`**Use it wisely:**\n https://discord.gg/${invite.code}`))
                    .catch(console.error);
            }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                msg.channel.createInvite()
                    .then(invite => msg.channel.send(`**Utilizalo sabiamente:**\n https://discord.gg/${invite.code}`))
                    .catch(console.error);
            }
            break;
        case 'block':
            if (userBlock === undefined) {
                let errBlockInfo;
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                    errBlockInfo = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`You haven't specified the ID of the user to block`)
                        .setTimestamp();
                } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                    errBlockInfo = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`No has especificado la ID del usuario a bloquear`)
                        .setTimestamp();
                }
                msg.channel.send({ embeds: [errBlockInfo] });
            } else {
                if (!blockedGuID[positionBlocked].includes(userBlock)) {
                    blockedGuID[positionBlocked].push(userBlock);
                    let blockInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        blockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Blocked by:**  ${msg.author.username}`)
                            .setDescription(`My use has been blocked for the user with ID: ${userBlock}`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        blockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Bloqueado por:**  ${msg.author.username}`)
                            .setDescription(`Se ha bloqueado mi uso al/la usuari@ con ID: ${userBlock}`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [blockInfo] });
                } else {
                    let yablockInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        yablockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Oops...**  ${msg.author.username}`)
                            .setDescription(`This user (ID: ${userBlock}) was already blocked. Calm down...`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        yablockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Ups...**  ${msg.author.username}`)
                            .setDescription(`Est@ usuari@ (ID: ${userBlock}) ya estaba bloquead@. ¡No perdonas!`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [yablockInfo] });
                }
            }
            break;
        case 'unblock':
            if (userBlock === undefined) {
                let errunBlockInfo;
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                    errunBlockInfo = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`You haven't specified the ID of the user to unblock`)
                        .setTimestamp();
                } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                    errunBlockInfo = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`No has especificado la ID del usuario a desbloquear`)
                        .setTimestamp();
                }
                msg.channel.send({ embeds: [errunBlockInfo] });
            } else {
                if (blockedGuID[positionBlocked].indexOf(userBlock) === -1) {
                    let alunBlockInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        alunBlockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setDescription(`There isn't anyone with ID: ${userBlock} blocked on the server: ${msg.guild.name}`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        alunBlockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setDescription(`No hay nadie con ID: ${userBlock} que esté bloquead@ en este servidor: ${msg.guild.name}`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [alunBlockInfo] });
                } else {
                    let positionUnblock = blockedGuID[positionBlocked].indexOf(userBlock);
                    blockedGuID[positionBlocked].splice(positionUnblock, 1);
                    let unBlockInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        unBlockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Unblocked by:**  ${msg.author.username}`)
                            .setDescription(`My use has been unblocked for the user with ID: ${userBlock} on the server: ${msg.guild.name}`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        unBlockInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle(`**Desbloqueado por:**  ${msg.author.username}`)
                            .setDescription(`Se ha desbloqueado mi uso a la persona con ID: ${userBlock} en el servidor: ${msg.guild.name}`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [unBlockInfo] });
                }
            }
            break;
        case 'unblockall':
            if (positionBlocked !== -1) {
                let usersUnblocked = "";
                while (blockedGuID[positionBlocked].length > 0) {
                    const user = blockedGuID[positionBlocked].pop();
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        usersUnblocked += `\nMy use has been unblocked for the user with ID: ${user} on the server: ${msg.guild.name}`;
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        usersUnblocked += `\nMi uso se ha desbloqueado al usuario con ID: ${user} en el servidor: ${msg.guild.name}`;
                    }
                }
        
                if (usersUnblocked !== "") {
                    let unblockedInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        unblockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**List of unblocked users:**')
                            .setDescription(`${usersUnblocked}`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        unblockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**Lista de usuarios desbloqueados:**')
                            .setDescription(`${usersUnblocked}`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [unblockedInfo] });
                } else {
                    let noUnblockedInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        noUnblockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**No users blocked**')
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        noUnblockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**No hay usuarios bloqueados**')
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [noUnblockedInfo] });
                }
            }
            break;
        case 'blockedusers':
            if (positionBlocked !== -1) {
                let usersBlocked = "";
                let cnt3 = blockedGuID[positionBlocked].length - 1;
            
                if (cnt3 >= 0) {
                    while (cnt3 >= 0) {
                        const user = blockedGuID[positionBlocked][cnt3];
                        if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                            usersBlocked += `\n**User blocked with ID:** (${user}) on the server: ${msg.guild.name}`;
                        } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                            usersBlocked += `\n**Usuario bloqueado con ID:** (${user}) en el servidor: ${msg.guild.name}`;
                        }
                        cnt3--;
                    }
            
                    let blockedInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        blockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**List of blocked users:**')
                            .setDescription(`${usersBlocked}`)
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        blockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**Lista de usuarios bloqueados:**')
                            .setDescription(`${usersBlocked}`)
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [blockedInfo] });
                } else {
                    let noBlockedInfo;
                    if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                        noBlockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**No users blocked**')
                            .setTimestamp();
                    } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                        noBlockedInfo = new EmbedBuilder()
                            .setColor('DarkOrange')
                            .setTitle('**No hay usuarios bloqueados**')
                            .setTimestamp();
                    }
                    msg.channel.send({ embeds: [noBlockedInfo] });
                }
            }
            break;
        case 'myroles':
            //To be completed
            break;
        case 'showmembers':
            server.members.fetch().then(members => {
                // Inicializamos el contador y la información de los miembros
                let cnt = 1;
                let infoShowMembers = "";
            
                // Iteramos sobre cada miembro del servidor
                members.forEach(member => {
                    if (member.id !== client.user.id) {
                        infoShowMembers += `${cnt}. ${member.user.username}\n`;
                        cnt++;
                    }
                });
            
                let showMembers;
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                    showMembers = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`**Server members:**`)
                        .setDescription(`${infoShowMembers}`)
                        .setTimestamp();
                } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                    showMembers = new EmbedBuilder()
                        .setColor('DarkOrange')
                        .setTitle(`**Miembros del servidor:**`)
                        .setDescription(`${infoShowMembers}`)
                        .setTimestamp();
                }
            
                msg.channel.send({ embeds: [showMembers] });
            }).catch(err => {
                console.error('Error fetching members:', err);
            });
            break;
        case 'kingdom':
            let kingdomInfo;
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                kingdomInfo = new EmbedBuilder()
                    .setColor('DarkOrange')
                    .setTitle(`**Conquered Worlds:** ${client.guilds.cache.size}`)
                    .setTimestamp();
                msg.channel.send({ embeds: [kingdomInfo] });
            } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                kingdomInfo = new EmbedBuilder()
                    .setColor('DarkOrange')
                    .setTitle(`**Mundos conquistados:** ${client.guilds.cache.size}`)
                    .setTimestamp();
                msg.channel.send({ embeds: [kingdomInfo] });
            }
            break;
        case 'help':
            let helpCommand;
            const linkRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setURL('https://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot')
                        .setLabel('BOT INVITATION')
                        .setStyle(ButtonStyle.Link)
                );
            
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                helpCommand = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('**List of the possible bot commands:**\n')
                    .setDescription('\n`$help` :arrow_right: Shows posible commands\n`$language` :arrow_right: Change the language of the bot\n`$emporium` :arrow_right: Shows the bot invitation link\n`$invite` :arrow_right: Shows the server invitation link\n`$hola` | `$hello` :arrow_right: Greeting from the bot\n`$picture` :arrow_right: Shows the bot profile picture\n`$server` :arrow_right: Shows the server information\n`$user` :arrow_right: Shows the user information\n* `$sum [number1] [number2] ...` :arrow_right: Sum all the numbers you write\n* `$sub [number1] [number2] ...` :arrow_right: Subtract all the numbers you write\n* `$mul [number1] [number2] ...` :arrow_right: Multiply all the numbers you write\n* `$div [numero1] [numero2] ...` :arrow_right: Divide all the numbers you write\n`$block [id of the user]` :arrow_right: Block the user with this id to use the bot\n`$blockedusers` :arrow_right: Shows users blocked to use the bot\n`$unblock [id of the user]` :arrow_right: Allows the user with this id to use the bot\n`$unblockall`  :arrow_right: Allows every blocked user to use the bot again\n`$showmembers` :arrow_right: Shows every member of the server\n`$myroles` :arrow_right: Shows your roles\n`$kingdom` :arrow_right: Shows the number of servers where Emporium is\n`$coinflip` :arrow_right: Returns Head or Tail\n* `$random [number1] [number2]` :arrow_right: Random value between the two numbers given');
            } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                helpCommand = new EmbedBuilder()
                    .setColor('Blurple')
                    .setTitle('**Lista de posibles comandos del bot:**\n')
                    .setDescription('\n`$help` :arrow_right: Muestra los posibles comandos\n`$language` :arrow_right: Cambia el idioma del bot\n`$emporium` :arrow_right: Muestra el link de invitación del bot\n`$invite` :arrow_right: Muestra el link de invitación del servidor\n`$hola` | `$hello` :arrow_right: Saludo del bot\n`$picture` :arrow_right: Muestra la foto que tiene el bot de perfil\n`$server` :arrow_right: Muestra la información del servidor\n`$user` :arrow_right: Muestra la información del propio usuario\n* `$sum [numero1] [numero2] ...` :arrow_right: Suma todos los números que escribas\n* `$sub [numero1] [numero2] ...` :arrow_right: Resta todos los números que escribas\n* `$mul [numero1] [numero2] ...` :arrow_right: Multiplica todos los números que escribas\n* `$div [numero1] [numero2] ...` :arrow_right: Divide todos los números que escribas\n`$block [id de un usuario]` :arrow_right: Prohíbe al usuario con esa id utilizar este bot\n`$blockedusers`  :arrow_right: Muestra los usuarios que no pueden utilizar el bot\n`$unblock [id de un usuario]` :arrow_right: Permite al usuario con esa id utilizar este bot\n`$unblockall`  :arrow_right: Permite a todos los usuarios bloqueados volver a utilizar este bot\n`$showmembers` :arrow_right: Muestra los integrantes del servidor\n`$myroles` :arrow_right: Muestra los roles que tienes\n`$kingdom` :arrow_right: Muestra los servidores que tienen añadido este bot\n`$coinflip` :arrow_right: Devuelve Cara o Cruz\n* `$random [numero1] [numero2]` :arrow_right: Valor aleatorio entre los dos introducidos');
            }
        
            msg.reply({ embeds: [helpCommand], components: [linkRow] });
            break;
        case 'language':
            const row = new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                    .setCustomId("menu_idioma")
                    .setPlaceholder("Seleccione un idioma")
                    .addOptions([
                        { label: "English", description: "Select the English language for the bot", value: "english" },
                        { label: "Español", description: "Selecciona el español como lenguaje para el bot", value: "español" }
                    ])
            );

            const langMessage = await msg.channel.send({ content: "Seleccione un idioma:", components: [row] });

            const collector = langMessage.createMessageComponentCollector({ time: 60000 });
            collector.on("collect", async interaction => {
                if (interaction.customId === "menu_idioma") {
                    languageGu[guildIDS.indexOf(msg.guild.id)] = interaction.values[0];
                    await interaction.update({ content: `Idioma / Language: ${interaction.values[0]}`, components: [] });
                }
            })
            break;
        case 'random':
            if(args.length !== 2 || isNaN(args[0]) || isNaN(args[1]) || numArgs[0] >= numArgs[1]){
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                    msg.channel.send("You can only write two numbers, the first one must be lower than the second one");
                }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                    msg.channel.send("Solo puedes poner dos números, primero el menor número y después el mayor");
                }
            }else{
                const randomNum = Math.floor(Math.random()*(numArgs[1]-numArgs[0]+1)+(numArgs[0]));
                if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                    msg.reply(`**Random number:** ${randomNum}`);
                }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                    msg.reply(`**Número aleatorio obtenido:** ${randomNum}`);
                }
            }
            break;
        case 'coinflip':
            const coin = Math.random();
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                if(coin <= 0.50000){
                    msg.reply(`**Coin Result:** HEAD`);
                }else{
                    msg.reply(`**Coin Result:** TAIL`);
                }
            }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                if(coin <= 0.50000){
                    msg.reply(`**Resultado de la moneda:** CARA`);
                }else{
                    msg.reply(`**Resultado de la moneda:** CRUZ`);
                }
            }
            break;
        case 'emporium':
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english"){
                msg.channel.send('**The universe expands...**\n\nhttps://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot');
            }else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español"){
                msg.channel.send('**El universo se expande...**\n\nhttps://discord.com/api/oauth2/authorize?client_id=973652617429397504&permissions=8&scope=bot');
            }
            break;
        default:
            let notCommand;
            if (languageGu[guildIDS.indexOf(msg.guild.id)] === "english") {
                notCommand = new EmbedBuilder()
                    .setColor('Red')
                    .setTimestamp()
                    .setTitle(':x: **I still don\'t have the knowledge to understand this command**')
                    .setDescription(`Try another command or write $help to discover my secrets`)
                    .setFooter({ text: msg.author.username });
            } else if (languageGu[guildIDS.indexOf(msg.guild.id)] === "español") {
                notCommand = new EmbedBuilder()
                    .setColor('Red')
                    .setTimestamp()
                    .setTitle(':x: **Aún no tengo el conocimiento necesario para entender esa orden**')
                    .setDescription(`Prueba a usar otro comando o escribe $help para descubrir mis secretos`)
                    .setFooter({ text: msg.author.username });
            }
            msg.reply({ embeds: [notCommand] });
    }
});

client.on("guildMemberAdd",member => {
    if (!member.user.bot) {
        users.push(member.user.id);
    
        let newMember;
        if (languageGu[guildIDS.indexOf(member.guild.id)] === "english") {
            newMember = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTimestamp()
                .setTitle('**The server expands**')
                .setDescription(`**New user:** ${member.user.username} on the server: ${member.guild.name}\n **Welcome!** You are the user number ${member.guild.memberCount} to arrive.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: member.user.username });
        } else if (languageGu[guildIDS.indexOf(member.guild.id)] === "español") {
            newMember = new EmbedBuilder()
                .setColor('DarkOrange')
                .setTimestamp()
                .setTitle('El servidor se expande')
                .setDescription(`**Nuevo usuario:** ${member.user.username} en el servidor: ${member.guild.name}\n **¡Bienvenid@!** Eres el usuario número ${member.guild.memberCount} en llegar.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: member.user.username });
        }
    
        const channel = member.guild.channels.cache.find(channel =>
            (channel.name.toLowerCase().includes('bienvenida') ||
            channel.name.toLowerCase().includes('bienvenido') ||
            channel.name.toLowerCase().includes('bienvenidos') ||
            channel.name.toLowerCase().includes('bienvenidas') ||
            channel.name.toLowerCase().includes('gente nueva') ||
            channel.name.toLowerCase().includes('nuevos miembros') ||
            channel.name.toLowerCase().includes('new members') ||
            channel.name.toLowerCase().includes('registro-de-miembros') ||
            channel.name.toLowerCase().includes('welcome')) &&
            channel.type === 0 && // 0 indica 'GUILD_TEXT' en la API más reciente
            channel.guild.id === member.guild.id
        );
    
        if (channel !== undefined) {
            channel.send({ embeds: [newMember] });
        }
    }
});

client.on("guildMemberRemove", (member) => {
    if (!member.user.bot) {
        const indexUser = users.indexOf(member.user.id);
        if (indexUser !== -1) users.splice(indexUser, 1);

        let deleteMember;
        if (languageGu[guildIDS.indexOf(member.guild.id)] === "english") {
            deleteMember = new EmbedBuilder()
                .setColor('Red')
                .setTimestamp()
                .setTitle('**The expansion won\'t be stopped**')
                .setDescription(`Today we say goodbye on the server: ${member.guild.name} to... ${member.user.username}.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: member.user.username });
        } else if (languageGu[guildIDS.indexOf(member.guild.id)] === "español") {
            deleteMember = new EmbedBuilder()
                .setColor('Red')
                .setTimestamp()
                .setTitle('**La expansión no se detendrá**')
                .setDescription(`Hoy decimos adiós en el server: ${member.guild.name} a... ${member.user.username}.`)
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .setFooter({ text: member.user.username });
        }

        const channel = member.guild.channels.cache.find(channel =>
            (channel.name.toLowerCase().includes('despedidas') ||
            channel.name.toLowerCase().includes('goodbye') ||
            channel.name.toLowerCase().includes('eliminations') ||
            channel.name.toLowerCase().includes('eliminados') ||
            channel.name.toLowerCase().includes('expulsados') ||
            channel.name.toLowerCase().includes('registro-de-miembros') ||
            channel.name.toLowerCase().includes('desertores')) &&
            channel.type === 0 && // 0 indica 'GUILD_TEXT' en la versión más reciente
            channel.guild.id === member.guild.id
        );

        if (channel !== undefined) {
            channel.send({ embeds: [deleteMember] });
        }
    } else if (member.user.id === client.user.id) {
        const guildIndex = guildIDS.indexOf(member.guild.id);
        if (guildIndex !== -1) {
            blockedGuID.splice(guildIndex, 1);
            languageGu.splice(guildIndex, 1);
            guildIDS.splice(guildIndex, 1);
        }
    }
});

client.on('guildCreate', async guild => {
    if (!guildIDS.includes(guild.id)) {
        guildIDS.push(guild.id);
        languageGu.push("");
        blockedGuID.push([]);
    } else {
        languageGu[guildIDS.indexOf(guild.id)] = "";
        blockedGuID[guildIDS.indexOf(guild.id)] = [];
    }

    const introduction = new EmbedBuilder()
        .setColor('DarkOrange')
        .setTitle('**Prepare for the rise of a new dawn...**')
        .setDescription('My name is **Emporium**. Thanks for inviting me, to unleash my knowledge write `$help`\n\n **Discover the unknown...**\n\n Selecciona un idioma/Select a Language:')
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));

    if (guild.systemChannel) {
        guild.systemChannel.send({ embeds: [introduction] });
    }

    const row = new ActionRowBuilder().addComponents(
        new SelectMenuBuilder()
            .setCustomId("menu_idioma")
            .setPlaceholder("Seleccione un idioma")
            .addOptions([
                { label: "English", description: "Select the English language for the bot", value: "english" },
                { label: "Español", description: "Selecciona el español como lenguaje para el bot", value: "español" }
            ])
    );

    const langMessage = await msg.channel.send({ content: "Seleccione un idioma:", components: [row] });

    const collector = langMessage.createMessageComponentCollector({ time: 60000 });
    collector.on("collect", async interaction => {
        if (interaction.customId === "menu_idioma") {
            languageGu[guildIDS.indexOf(msg.guild.id)] = interaction.values[0];
            await interaction.update({ content: `Idioma / Language: ${interaction.values[0]}`, components: [] });
        }
    })
    
});
client.login(process.env.DISCORD_TOKEN);
