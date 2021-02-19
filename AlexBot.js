const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("guildMemberAdd", (guildMember) => {
    const fs = require("fs");
    if (!fs.existsSync("./resources/userData")) fs.mkdirSync("./resources/userData");
    if (!fs.existsSync("./resources/userData/" + guildMember.guild.id)) fs.mkdirSync("./resources/userData/" + guildMember.guild.id);

    let filePath = "./resources/userData/" + guildMember.guild.id + "/" + guildMember.user.id + ".json";
    if (!fs.existsSync(filePath)) {
        let data = {
            id: guildMember.user.id,
            tag: guildMember.user.tag,
            nickname: guildMember.nickname,
            levelPoints: 0,
            lastUsedStaatsoberhaupt: 0,
            lastUsedSuperStaatsoberhaupt: 0,
            staatsoberhäupter: {},
            openTrades: [],
            unlockedAchievments: []
        }
        fs.writeFileSync(filePath, JSON.stringify(data));
    } else {
        let data = JSON.parse(fs.readFileSync(filePath));
        data.id = guildMember.user.id;
        data.tag = guildMember.user.tag;
        data.nickname = guildMember.nickname;
        if (!data.hasOwnProperty("levelPoints")) data.levelPoints = 0;
        if (!data.hasOwnProperty("lastUsedStaatsoberhaupt")) data.lastUsedStaatsoberhaupt = 0;
        if (!data.hasOwnProperty("lastUsedSuperStaatsoberhaupt")) data.lastUsedSuperStaatsoberhaupt = 0;
        if (!data.hasOwnProperty("staatsoberhäupter")) data.staatsoberhäupter = {};
        if (!data.hasOwnProperty("openTrades")) data.openTrades = [];
        if (!data.hasOwnProperty("unlockedAchievments")) data.unlockedAchievments = [];
        fs.writeFileSync(filePath, JSON.stringify(data));
    }
});

client.on("message", async (message) => {
    if (message.author.bot || !message.guild) return;
    //console.log(message.author.username + " said: " + message.content); //logging messages to console

    //logging every message
    let saveData = { createdAt: message.createdAt, user: message.author.username, content: message.content, guild: message.guild.name, channel: message.channel.name }
    let path = "./resources/history/";
    if (!fs.existsSync("./resources/history/")) fs.mkdirSync("./resources/history/");
    if (!fs.existsSync(path + message.guild.id)) fs.mkdirSync(path + message.guild.id);
    fs.appendFileSync(path + message.guild.id + "/" + message.channel.id + ".json", JSON.stringify(saveData) + "\n");

    //building prefix, command and args
    const prefix = config.prefix;
    let commandBody;
    if (message.content.startsWith(prefix) && message.content.length > 1) {
        commandBody = message.content.slice(prefix.length);
    } else {
        commandBody = message.content;
    }

    let args = commandBody.split(' ');
    let newArgs = [];
    for (i = 0; i < args.length; i++) {
        if (!args[i].startsWith("<@") && args[i].length !== 0) {
            newArgs.push(args[i]);
        }
    }
    args = newArgs;

    let command = "";
    if (args.length > 0) command = args.shift().toLowerCase();

    //checking and executing every command
    let commands = require("./resources/commands.js");
    for (item of commands) {
        try {
            if ((item.name === command || item.aliases.includes(command)) && message.content.startsWith(prefix)) {
                //Parameters: client Object, message Object, command arguments, data with state, whether it was triggered without a prefix
                item.command(message, client, args, item.remember, false, message.content.startsWith(prefix));
                return;
            } else if (item.alwaysTrigger) {
                item.command(message, client, args, item.remember, true, message.content.startsWith(prefix));
            }
        } catch(err) {
            console.log("Fehler!!!", err);
            let alex = await client.users.fetch("399177273032572948");
            alex.send("Ich habe diesen Fehler gecatched:\n\n" + JSON.stringify(err, Object.getOwnPropertyNames(err), 4));
        }
    }
    if (message.content.startsWith(prefix)) {
        message.reply("Invalid command, try /help.");
    }
});

client.login(config.token); //login the bot

