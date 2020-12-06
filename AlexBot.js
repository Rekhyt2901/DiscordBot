const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
const client = new Discord.Client();

client.on("ready", () => {
    console.log("I am ready!");
});

client.on("message", function (message) {
    if (message.author.bot || !message.guild) return;
    //console.log(message.author.username + " said: " + message.content); //logging messages to console

    //logging every message
    let saveData = { createdAt: message.createdAt, user: message.author.username, content: message.content, guild: message.guild.name, channel: message.channel.name }
    let path = "./resources/history/";
    if(!fs.existsSync("./resources/history/")) fs.mkdirSync("./resources/history/");
    if(!fs.existsSync(path + message.guild.id)) fs.mkdirSync(path + message.guild.id);
    fs.appendFileSync(path + message.guild.id + "/" + message.channel.id + ".json", JSON.stringify(saveData) + "\n");

    //building prefix, command and args
    const prefix = config.prefix;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    //checking and executing every command
    let commands = require("./resources/commands.js");
    for(item of commands) {
        if((item.name === command || item.aliases.includes(command)) && message.content.startsWith(prefix)) {
            //Parameters: client Object, message Object, command arguments, data with state, whether it was triggered without a prefix
            item.command(message, client, args, item.remember, false, message.content.startsWith(prefix));
            return;
        } else if(item.alwaysTrigger) {
            item.command(message, client, args, item.remember, true, message.content.startsWith(prefix));
        }
    }
    if(message.content.startsWith(prefix)) {
        message.reply("Invalid command, try /help.");
    }
});

client.login(config.token); //login the bot

