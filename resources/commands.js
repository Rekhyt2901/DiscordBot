/*
command structure:

    name: name of the command,
    aliases: alternative names,
    alwaysTrigger: whether it is triggered without the prefix + command name
    remember: data that has to be safed between function calls,
    command: function to be executed
        command function parameters: client Object, message Object, command arguments, remembered data, whether it was called from the command itsel, whether it started with the prefix

*/
function setUserData(message, key, value) {
    const fs = require("fs");
    let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
    let data = JSON.parse(fs.readFileSync(filePath));
    data[key] = value;
    fs.writeFileSync(filePath, JSON.stringify(data));
}

function getUserData(message, key) {
    const fs = require("fs");
    let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
    let data = JSON.parse(fs.readFileSync(filePath));
    return data[key];
}

function getAllUserData(message) {
    const fs = require("fs");
    let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
    let data = JSON.parse(fs.readFileSync(filePath));
    return data;
}

module.exports = [
    {
        name: "userData",
        aliases: [],
        alwaysTrigger: true,
        command: (message) => {
            const fs = require("fs");
            if (!fs.existsSync("./resources/userData")) fs.mkdirSync("./resources/userData");
            if (!fs.existsSync("./resources/userData/" + message.guild.id)) fs.mkdirSync("./resources/userData/" + message.guild.id);

            let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
            if (!fs.existsSync(filePath)) {
                let data = {
                    id: message.author.id,
                    tag: message.author.tag,
                    nickname: (message.member.nickname === null ? message.author.tag : message.member.nickname),
                    levelPoints: 0,
                    lastUsedStaatsoberhaupt: 0,
                    lastUsedSuperStaatsoberhaupt: 0,
                    staatsoberhäupter: {},
                    openTrades: [],
                    unlockedAchievments: []
                }
                fs.writeFileSync(filePath, JSON.stringify(data));
            } else {
                let data = getAllUserData(message);
                data.id = message.author.id;
                data.tag = message.author.tag;
                data.nickname = (message.member.nickname === null ? message.author.tag : message.member.nickname);
                if (!data.hasOwnProperty("levelPoints")) data.levelPoints = 0;
                if (!data.hasOwnProperty("lastUsedStaatsoberhaupt")) data.lastUsedStaatsoberhaupt = 0;
                if (!data.hasOwnProperty("lastUsedSuperStaatsoberhaupt")) data.lastUsedSuperStaatsoberhaupt = 0;
                if (!data.hasOwnProperty("staatsoberhäupter")) data.staatsoberhäupter = {};
                if (!data.hasOwnProperty("openTrades")) data.openTrades = [];
                if (!data.hasOwnProperty("unlockedAchievments")) data.unlockedAchievments = [];
                fs.writeFileSync(filePath, JSON.stringify(data));
            }
        }
    },
    {
        name: "help",
        aliases: ["h", "?"],
        alwaysTrigger: false,
        command: require("./help.js")
    },
    {
        name: "faq",
        aliases: [],
        alwaysTrigger: true,
        command: async (message, client, args, remember, falseTriggered, startsWithPrefix) => {
            if (falseTriggered && !startsWithPrefix) {
                let FAQ = require("./FAQ.js").FAQ;
                for (item of FAQ) {
                    if (message.content.toLowerCase() === item.question.toLowerCase() || message.content.toLowerCase() === item.question.toLowerCase() + "?" || message.content.toLowerCase() === item.question.toLowerCase() + "!" || message.content.toLowerCase() === item.question.toLowerCase() + ".") {
                        if (item.answer instanceof Function) {
                            message.reply(await item.answer());
                        } else {
                            message.reply(item.answer);
                        }
                    }
                }
            }
        }
    },
    {
        name: "staatsoberhaupt",
        aliases: ["so"],
        alwaysTrigger: false,
        command: (message) => {
            let staatsoberhäupter = require("./staatsoberhäupter.json").staatsoberhäupter;
            let lastUsed = getUserData(message, "lastUsedStaatsoberhaupt");
            let now = Date.now();
            let timeElapsed = now - lastUsed;
            if (timeElapsed < 1800000) {
                //if (timeElapsed < 0) {
                let timeToWait = Math.ceil((1800000 - timeElapsed) / 1000 / 60);
                message.reply("Du kannst in " + timeToWait + " Minuten nochmal ziehen!");
                return;
            }

            let numberOfNames = 0;
            for (let i = 0; i < staatsoberhäupter.length; i++) {
                numberOfNames += staatsoberhäupter[i].names.length;
            }
            let nameIndex = Math.floor(Math.random() * numberOfNames);

            let listIndex = 0;
            while (nameIndex > staatsoberhäupter[listIndex].names.length - 1) {
                nameIndex -= staatsoberhäupter[listIndex].names.length;
                listIndex++;
            }

            let Land = staatsoberhäupter[listIndex].list;
            let Staatsoberhaupt = staatsoberhäupter[listIndex].names[nameIndex];
            let linkName = Staatsoberhaupt.replace(/ /g, "_");
            if (linkName.endsWith("_(1)") || linkName.endsWith("_(2)") || linkName.endsWith("_(3)") || linkName.endsWith("_(4)") || linkName.endsWith("_(5)") || linkName.endsWith("_(6)")) {
                linkName = linkName.substring(0, linkName.length - 4);
            }
            let Link = "https://de.wikipedia.org/wiki/" + linkName;

            let savedData = getUserData(message, "staatsoberhäupter");
            if (!savedData.hasOwnProperty(Land)) {
                newLandArray = [];
                for (let i = 0; i < staatsoberhäupter[listIndex].names.length; i++) newLandArray.push(0);
                savedData[Land] = newLandArray;
            }
            savedData[Land][nameIndex]++;
            setUserData(message, "staatsoberhäupter", savedData);

            let points = Math.floor(((staatsoberhäupter[listIndex].names.length - nameIndex) / staatsoberhäupter[listIndex].names.length) * 100);
            if (Staatsoberhaupt.match(/^(Adolf Hitler|Angela Merkel|Vladimir Putin|Franziskus|Wladimir Lenin|Josef Stalin|Elisabeth II\.|Kim Jong-Un|Barack Obama)$/i)) points = 150;
            if (Staatsoberhaupt.match(/^(Alex Kleyn|Laurenz Schulz|Aaraes der Bomber|wer diesen zieht kriegt eine Cola|Fabio der Lange|Stella die Kleine)$/i)) points = 200;
            if (Staatsoberhaupt.match(/^(nicht Niko, der keck wurde nie gewählt|Donald Trump)$/i)) points = -100;
            message.reply(`Das ${nameIndex + 1}. Staatsoberhaupt von ${Land} war ${Staatsoberhaupt}${Staatsoberhaupt.endsWith(".") ? "" : "."}\nDu hast ${points} Punkte bekommen!\n${Link}`);

            setUserData(message, "levelPoints", getUserData(message, "levelPoints") + points);
            setUserData(message, "lastUsedStaatsoberhaupt", now);
        }
    },
    {
        name: "superstaatsoberhaupt",
        aliases: ["sso", "superso"],
        alwaysTrigger: false,
        command: (message) => {
            let staatsoberhäupter = require("./staatsoberhäupter.json").staatsoberhäupter;
            let lastUsedSuper = getUserData(message, "lastUsedSuperStaatsoberhaupt");
            let dayNow = Math.floor((Date.now() + 3600000) / 86400000);
            if (dayNow - lastUsedSuper <= 0) {
                message.reply("Du hast heute schon Super Staatsoberhaupt benutzt. Komm morgen wieder!");
                return;
            }

            let numberOfNames = 0;
            for (let i = 0; i < staatsoberhäupter.length; i++) {
                numberOfNames += staatsoberhäupter[i].names.length;
            }
            let nameIndex = Math.floor(Math.random() * numberOfNames);

            let listIndex = 0;
            while (nameIndex > staatsoberhäupter[listIndex].names.length - 1) {
                nameIndex -= staatsoberhäupter[listIndex].names.length;
                listIndex++;
            }

            let Land = staatsoberhäupter[listIndex].list;
            let Staatsoberhaupt = staatsoberhäupter[listIndex].names[nameIndex];
            let Link = "https://de.wikipedia.org/wiki/" + Staatsoberhaupt.replace(/ /g, "_");

            let savedData = getUserData(message, "staatsoberhäupter");
            if (!savedData.hasOwnProperty(Land)) {
                newLandArray = [];
                for (let i = 0; i < staatsoberhäupter[listIndex].names.length; i++) newLandArray.push(0);
                savedData[Land] = newLandArray;
            }
            savedData[Land][nameIndex]++;
            setUserData(message, "staatsoberhäupter", savedData);

            let points = Math.floor(((staatsoberhäupter[listIndex].names.length - nameIndex) / staatsoberhäupter[listIndex].names.length) * 100);
            if (Staatsoberhaupt.match(/^(Adolf Hitler|Angela Merkel|Vladimir Putin|Franziskus|Wladimir Lenin|Josef Stalin|Elisabeth II\.|Kim Jong-Un|Barack Obama)$/i)) points = 150;
            if (Staatsoberhaupt.match(/^(Alex Kleyn|Laurenz Schulz|Aaraes der Bomber|wer diesen zieht kriegt eine Cola|Fabio der Lange|Stella die Kleine)$/i)) points = 200;
            if (Staatsoberhaupt.match(/^(nicht Niko, der keck wurde nie gewählt|Donald Trump)$/i)) points = -100;

            points *= 3;

            message.reply(`Super Staatsoberhaupt gibt dreifache Punkte!\nDas ${nameIndex + 1}. Staatsoberhaupt von ${Land} war ${Staatsoberhaupt}${Staatsoberhaupt.endsWith(".") ? "" : "."}\nDu hast ${points} Punkte bekommen!\n${Link}`);

            setUserData(message, "levelPoints", getUserData(message, "levelPoints") + points);
            setUserData(message, "lastUsedSuperStaatsoberhaupt", dayNow);
        }
    },
    {
        name: "skribbl",
        aliases: [],
        alwaysTrigger: true,
        remember: { recording: false, channelId: null, filePath: null },
        command: (message, client, args, remember, falseTriggered, startsWithPrefix) => {
            const fs = require("fs");
            //Start recording
            if (!remember.recording && !falseTriggered) {
                remember.channelId = message.channel.id;
                if (!fs.existsSync("./resources/skribbl")) fs.mkdirSync("./resources/skribbl");
                remember.filePath = "./resources/skribbl/" + message.createdAt.toISOString().replace(/:|\./g, "-") + ".dat";
                //console.log("Started Recording Words!");
                message.guild.channels.cache.get(remember.channelId).send("Started Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Return if not from same channel
            if (message.channel.id !== remember.channelId && remember.recording) {
                //console.log("Message from wrong Channel!");
                return;
            }
            //Stop recording
            if (remember.recording && !falseTriggered) {
                message.guild.channels.cache.get(remember.channelId).send("Stopped recording Words!\n" + (fs.existsSync(remember.filePath) ? fs.readFileSync(remember.filePath) : "No Words were recorded.") + "\nPlay at https://skribbl.io/");
                //console.log("stopped Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Write down word
            if (remember.recording && falseTriggered && !startsWithPrefix) {
                fs.appendFileSync(remember.filePath, message.content + ",");
                //console.log("Added Word:" + message.content);
                return;
            }
        }
    },
    {
        name: "randomimage",
        aliases: ["ri", "img", "randomimg", "image"],
        alwaysTrigger: false,
        command: async (message, client, args) => {
            const fetch = require("node-fetch");
            let data;
            if (!isNaN(args[0]) && !isNaN(args[1])) {
                data = await fetch("https://picsum.photos/" + args[0] + "/" + args[1]);
            } else if (!isNaN(args[0])) {
                data = await fetch("https://picsum.photos/" + args[0]);
            } else {
                data = await fetch("https://picsum.photos/200/300");
            }
            //console.log("sent picture: " + data.url)
            const embed = {
                "title": "Dein random Bild:",
                "url": data.url,
                "color": 6744043,
                image: {
                    url: data.url,
                },
            };
            message.channel.send({ embed: embed });
        }
    },
    {
        name: "profile",
        aliases: ["p"],
        alwaysTrigger: false,
        command: (message) => {
            let achievments = require("./achievments.js");
            let embed;
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().bot) {
                    message.reply("Der User den du angegeben hast ist ein Bot.");
                    return;
                }
                const user = message.mentions.users.first();
                if (!message.guild.member(user.id)) {
                    message.reply("Der angegebene User ist nicht auf diesem Server!");
                    return;
                }
                const fs = require("fs");
                const data = JSON.parse(fs.readFileSync("./resources/userData/" + message.guild.id + "/" + user.id + ".json"));
                embed = {
                    "title": user.tag + "'s Profil:",
                    "color": 6744043,
                    "fields": [
                        {
                            "name": "Tag:",
                            "value": user.tag
                        },
                        {
                            "name": "Nickname:",
                            "value": (data.nickname === null ? "kein nickname vorhanden" : data.nickname)
                        },
                        {
                            "name": "Punkte:",
                            "value": data.levelPoints
                        },
                        {
                            "name": "Account Erstellt:",
                            "value": user.createdAt.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        },
                        {
                            "name": "Achievments:",
                            "value": data.unlockedAchievments.length + "/" + achievments.length
                        },
                        {
                            "name": "User-Id",
                            "value": user.id
                        }
                    ]
                };
            } else {
                let data = getAllUserData(message);
                embed = {
                    "title": "Dein Profil:",
                    "color": 6744043,
                    "fields": [
                        {
                            "name": "Tag:",
                            "value": message.author.tag
                        },
                        {
                            "name": "Nickname:",
                            "value": (message.member.nickname === null ? "kein nickname vorhanden" : message.member.nickname)
                        },
                        {
                            "name": "Punkte:",
                            "value": data.levelPoints
                        },
                        {
                            "name": "Account Erstellt:",
                            "value": message.author.createdAt.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        },
                        {
                            "name": "Server beigetreten:",
                            "value": message.member.joinedAt.toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                        },
                        {
                            "name": "Achievments:",
                            "value": data.unlockedAchievments.length + "/" + achievments.length
                        }
                    ]
                };
            }
            message.reply({ embed: embed });
        }
    },
    {
        name: "ranking",
        aliases: ["r", "rank"],
        alwaysTrigger: false,
        command: (message) => {
            let fields = [];
            const fs = require("fs");
            let filePath = "./resources/userData/" + message.guild.id;
            let files = fs.readdirSync(filePath);
            for (file of files) {
                let readFile = JSON.parse(fs.readFileSync(filePath + "/" + file));
                let nickname = readFile["nickname"];
                fields.push({ "name": nickname, "value": readFile["levelPoints"] });
            }

            fields.sort((a, b) => b["value"] - a["value"]);

            let string = "";
            for (let i = 0; i < fields.length; i++) {
                fields[i]["name"] = "**" + (i + 1) + ". " + fields[i]["name"] + "**\n";
                fields[i]["value"] = fields[i]["value"] + "\n"
                string += fields[i]["name"];
                string += fields[i]["value"];
            }
            //message.reply("Ich hab dir das Ranking zugeschickt!")
            //message.author.send("Das Punkte Ranking:\n" + string);
            message.reply("Das Punkte Ranking:\n" + string);
        }
    },
    {
        name: "list",
        aliases: ["l", "li"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            const fs = require("fs");
            let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
            if (message.mentions.users.first()) {
                if (message.mentions.users.first().bot) {
                    message.reply("Der User den du angegeben hast ist ein Bot.");
                    return;
                }
                if (!message.guild.member(message.mentions.users.first().id)) {
                    message.reply("Der angegebene User ist nicht auf diesem Server!");
                    return;
                }
                filePath = "./resources/userData/" + message.guild.id + "/" + message.mentions.users.first().id + ".json";
            }
            let userData = JSON.parse(fs.readFileSync(filePath));
            let staatsoberhäupter = userData.staatsoberhäupter;

            let embed;
            if (args.length === 0) {
                let fields = [];
                for (staat in staatsoberhäupter) {
                    let anzahlOberhäupter = 0;
                    for (let i = 0; i < staatsoberhäupter[staat].length; i++) anzahlOberhäupter += staatsoberhäupter[staat][i];
                    let name = staat;
                    if (staat.split(" ").length > 1) name = staat.split(" ")[1];
                    fields.push({ "name": name, "value": anzahlOberhäupter });
                }

                let string = "";
                for (let i = 0; i < fields.length; i++) {
                    fields[i]["name"] = "**" + fields[i]["name"] + "**\n";
                    fields[i]["value"] = fields[i]["value"] + "\n"
                    string += fields[i]["name"];
                    string += fields[i]["value"];
                }
                if (message.mentions.users.first()) {
                    message.author.send("Die Staatsoberhäupter von " + message.mentions.users.first().tag + " nach Ländern:\n" + string);
                    message.reply("Ich hab dir die Liste der Staatsoberhäupter von " + message.mentions.users.first().tag + " zugeschickt!");
                    return;
                }
                message.author.send("Deine Staatsoberhäupter nach Ländern:\n" + string);
                message.reply("Ich hab dir die Liste deiner Staatsoberhäupter zugeschickt!");
            } else {
                let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
                let staat = args[0].toLowerCase();
                let fields = [];

                for (property in staatsoberhäupter) {
                    if (staatsoberhäupter.hasOwnProperty(property)) {
                        if (property.toLowerCase() === staat || (property.split(" ").length > 1 && property.split(" ")[1].toLowerCase() === staat)) {
                            staat = property;
                            break;
                        }
                    }
                }

                let validStaat = false;
                for (property in staatsoberhäupter) {
                    if (property === staat) {
                        validStaat = true;
                    }
                }
                if (!validStaat) {
                    embed = {
                        "title": "Vertippt?",
                        "description": "Entweder du hast noch kein Oberhaupt aus '" + staat + "' oder es gibt das Land nicht!",
                        "color": 6744043,
                    };
                    if (message.mentions.users.first()) {
                        embed = {
                            "title": "Vertippt?",
                            "description": "Entweder " + message.mentions.users.first().tag + " hat noch kein Oberhaupt aus '" + staat + "' oder es gibt das Land nicht!",
                            "color": 6744043,
                        };
                    }
                    message.reply({ embed: embed });
                    return;
                }

                for (let i = 0; i < staatsoberhäupter[staat].length; i++) {
                    let landIndex;
                    for (let j = 0; j < staatsoberhäupterListe.length; j++) if (staatsoberhäupterListe[j].list === staat) landIndex = j;
                    if (staatsoberhäupter[staat][i] > 0) fields.push({ "name": (i + 1) + ". " + staatsoberhäupterListe[landIndex].names[i], "value": staatsoberhäupter[staat][i] })
                }
                let string = "```diff\n";
                for (let i = 0; i < fields.length; i++) {
                    fields[i]["name"] = "+ " + fields[i]["name"] + ":";
                    fields[i]["value"] = " " + fields[i]["value"] + "\n"
                    string += fields[i]["name"];
                    string += fields[i]["value"];
                }
                string += "\n```";
                if (message.mentions.users.first()) {
                    message.author.send("Die Staatsoberhäupter von " + message.mentions.users.first().tag + " aus " + staat + ":\n" + string);
                    message.reply("Ich hab dir die Liste der Staatsoberhäupter von " + message.mentions.users.first().tag + " aus " + staat + " zugeschickt!");
                    return;
                }
                message.author.send("Deine Staatsoberhäupter aus " + staat + ":\n" + string);
                message.reply("Ich hab dir deine Staatsoberhäupter aus " + staat + " zugeschickt")
            }
        }
    },
    {
        name: "trade",
        aliases: ["t"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            if (!message.mentions.users.first() && args.length === 0) {
                message.reply("Um zu tauschen benutze z.B. /trade @user Angela-Merkel 200. Mit diesem Tausch würdest du Angela Merkel für 200 Punkte an 'user' verkaufen.");
                return;
            }
            if (!message.mentions.users.first()) {
                message.reply("Du hast keinen User gementioned!");
                return;
            }
            if (message.mentions.users.first().bot) {
                message.reply("Du kannst nicht mit einem Bot tauschen.");
                return;
            }
            if (!message.guild.member(message.mentions.users.first().id)) {
                message.reply("Der angegebene User ist nicht auf diesem Server!");
                return;
            }
            if (args.length === 0) {
                message.reply("Gib bitte an was du tauschen möchtest. Als erstes was du bietest, als zweitest was du gerne hättest.");
                return;
            }
            if (args.length === 1) {
                message.reply("Bitte gib an was du von deinem Tauschpartner möchtest. (z.B. Angela-Merkel oder 200 (Punkte))");
                return;
            }
            let secondUser = message.mentions.users.first();
            if (args[0] === args[1] && isNaN(args[0]) && isNaN(args[1])) {
                message.reply("Gleiche Staatsoberhäupter tauschen ist Unfug!");
                return;
            }
            if (!message.guild.member(secondUser.id)) {
                message.reply("Der user mit dem du tauschen möchtest ist nicht auf diesem Server!");
                return;
            }
            if (message.author.id === secondUser.id) {
                message.reply("Mit dir selbst tauschen ist Unfug!");
                return;
            }
            const fs = require("fs");
            let filePath = "./resources/userData/" + message.guild.id + "/";
            if (!fs.existsSync(filePath + secondUser.id + ".json")) {
                message.reply("Der User " + secondUser.tag + " hat noch nie ein Staatsoberhaupt gezogen!");
                return;
            }
            let userData1 = JSON.parse(fs.readFileSync(filePath + message.author.id + ".json"));
            let userData2 = JSON.parse(fs.readFileSync(filePath + secondUser.id + ".json"));
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

            for (let i = 0; i < userData2.openTrades.length; i++) {
                if (userData2.openTrades[i].von === message.author.id) {
                    message.reply("Der User '" + userData2.nickname + "' hat noch eine ungeöffnete Tauschanfrage von dir!");
                    return;
                }
            }

            //name1 Parsing and validating
            let name1;
            if (isNaN(args[0])) {
                let name1 = args[0].replace(/-/g, " ");
                let name1Country;
                let name1Index;
                let name1Exists = false;
                for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                    for (let j = 0; j < staatsoberhäupterListe[i].names.length; j++) {
                        if (staatsoberhäupterListe[i].names[j].toLowerCase() === name1.toLowerCase()) {
                            name1Exists = true;
                            name1Country = staatsoberhäupterListe[i].list;
                            name1Index = j;
                        }
                    }
                }
                if (!name1Exists) {
                    message.reply("Vertippt? Das Staatsoberhaupt '" + name1 + "' gibt es nicht! Namen müssem mit Bindestrich getrennt werden (z.B. Philipp-VI.) Achte auf Sonderzeichen!");
                    return;
                }
                if (!userData1.staatsoberhäupter[name1Country][name1Index] > 0) {
                    message.reply("Das Staatsoberhaupt '" + name1 + "' ist nicht in deinem Besitz!");
                    return;
                }
                name1Object = {
                    name: name1,
                    staat: name1Country,
                    index: name1Index
                }
            } else {
                name1Object = Math.floor(Number.parseInt(args[0]));
                if (name1Object > userData1.levelPoints) {
                    message.reply("Du hast nicht genug Punkte!");
                    return;
                }
            }


            //name2 Parsing and validating
            let name2Object;
            if (isNaN(args[1])) {
                let name2 = args[1].replace(/-/g, " ");
                let name2Country;
                let name2Index;
                let name2Exists = false;
                for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                    for (let j = 0; j < staatsoberhäupterListe[i].names.length; j++) {
                        if (staatsoberhäupterListe[i].names[j].toLowerCase() === name2.toLowerCase()) {
                            name2Exists = true;
                            name2Country = staatsoberhäupterListe[i].list;
                            name2Index = j;
                        }
                    }
                }
                if (!name2Exists) {
                    message.reply("Vertippt? Das Staatsoberhaupt '" + name2 + "' gibt es nicht!");
                    return;
                }
                if (!userData2.staatsoberhäupter[name2Country][name2Index] > 0) {
                    message.reply("Dein Tauschpartner besitzt das Staatsoberhaupt '" + name2 + "' nicht!");
                    return;
                }
                name2Object = {
                    name: name2,
                    staat: name2Country,
                    index: name2Index
                }
            } else {
                name2Object = Math.floor(Number.parseInt(args[1]));
                if (name2Object > userData2.levelPoints) {
                    message.reply("Dein Tauschpartner hat nicht genug Punkte!");
                    return;
                }
            }

            let anfrage = {
                von: message.author.id,
                an: secondUser.id,
                angebot: name1Object,
                nachfrage: name2Object,
                timeStamp: Date.now()
            }

            userData2.openTrades.push(anfrage);
            fs.writeFileSync(filePath + secondUser.id + ".json", JSON.stringify(userData2));
            message.reply("Die Anfrage wurde Versendet!");
            secondUser.send("Du hast eine neue Tauschanfrage! Benutze /trades um deine Anfragen zu sehen!");
        }
    },
    {
        name: "trades",
        aliases: ["ts"],
        alwaysTrigger: false,
        command: (message) => {
            let fields = [];
            const fs = require("fs");
            let filePath = "./resources/userData/" + message.guild.id + "/";
            let userData = JSON.parse(fs.readFileSync(filePath + message.author.id + ".json"));
            let openTrades = userData.openTrades;

            for (let i = 0; i < openTrades.length; i++) {
                let value = "Bietet an: ";

                if (isNaN(openTrades[i].angebot)) {
                    let angebotsStaat = openTrades[i].angebot.staat.split(" ").length > 1 ? openTrades[i].angebot.staat.split(" ")[1] : openTrades[i].angebot.staat;
                    value += angebotsStaat + " - " + openTrades[i].angebot.name;
                } else {
                    value += openTrades[i].angebot + " Punkte";
                }
                value += "\nMöchte: "
                if (isNaN(openTrades[i].nachfrage)) {
                    let nachfrageStaat = openTrades[i].nachfrage.staat.split(" ").length > 1 ? openTrades[i].nachfrage.staat.split(" ")[1] : openTrades[i].nachfrage.staat;
                    value += nachfrageStaat + " - " + openTrades[i].nachfrage.name;
                } else {
                    value += openTrades[i].nachfrage + " Punkte";
                }

                let name = JSON.parse(fs.readFileSync(filePath + openTrades[i].von + ".json")).nickname;
                fields.push({ "name": (i + 1) + ". von " + name + ":", "value": value });
            }

            if (fields.length > 0) {
                const embed = {
                    "title": "Deine offenen Tauschangebote:",
                    "description": "Um Angebote anzunehmen oder abzulehnen benutz '/tradeAccept [Zahl]' oder '/tradeReject [Zahl]'. Die Nummer des Trades steht vor dem Namen.",
                    "color": 6744043,
                    "fields": fields
                };
                message.reply({ embed: embed });
            } else {
                message.reply("Du hast keine offenen Tauschangebote!");
            }
        }
    },
    {
        name: "tradeaccept",
        aliases: ["ta"],
        alwaysTrigger: false,
        command: async (message, client, args) => {
            if (args.length === 0) {
                message.reply("Du hast keine Zahl angegeben!");
                return;
            }
            if (isNaN(args[0])) {
                message.reply("Bitte gib die Nummer des trades an, den du Ablehnen möchtest!");
                return;
            }

            let openTrades = getUserData(message, "openTrades");
            if (openTrades.length === 0) {
                message.reply("Du hast keine offenen Tauschanfragen!");
                return;
            }
            if (args[0] - 1 > openTrades.length - 1) {
                message.reply("Du hast keine Tauschanfrage mit der Nummer " + args[0] + "! Sieh nochmal bei /trades nach.");
                return;
            }
            let tradeOffer = openTrades[args[0] - 1];
            openTrades.splice(args[0] - 1, 1);
            setUserData(message, "openTrades", openTrades);

            let sender = await client.users.fetch(tradeOffer.von);
            const fs = require("fs");
            let senderData = JSON.parse(fs.readFileSync("./resources/userData/" + message.guild.id + "/" + sender.id + ".json"));
            let userData = JSON.parse(fs.readFileSync("./resources/userData/" + message.guild.id + "/" + message.author.id + ".json"));

            console.log("senderData:", senderData);
            console.log("userData", userData);
            console.log("tradeOffer:", tradeOffer);
            if (isNaN(tradeOffer.angebot)) {
                senderData.staatsoberhäupter[tradeOffer.angebot.staat][tradeOffer.angebot.index]--;
                //
                let newZeros = 0;
                for (let i = 0; i < senderData.staatsoberhäupter[tradeOffer.angebot.staat].length; i++) {
                    newZeros += senderData.staatsoberhäupter[tradeOffer.angebot.staat][i];
                }
                if (newZeros === 0) delete senderData.staatsoberhäupter[tradeOffer.angebot.staat];
                //
                if (userData.staatsoberhäupter.hasOwnProperty(tradeOffer.angebot.staat)) {
                    userData.staatsoberhäupter[tradeOffer.angebot.staat][tradeOffer.angebot.index]++;
                } else {
                    let zeroArray = [];
                    for (let i = 0; i < senderData.staatsoberhäupter[tradeOffer.angebot.staat].length; i++) zeroArray.push(0);
                    userData.staatsoberhäupter[tradeOffer.angebot.staat] = zeroArray;
                    userData.staatsoberhäupter[tradeOffer.angebot.staat][tradeOffer.angebot.index]++;
                }
            } else {
                senderData.levelPoints -= tradeOffer.angebot;
                userData.levelPoints += tradeOffer.angebot;
            }
            console.log("vor nachfrage");
            if (isNaN(tradeOffer.nachfrage)) {
                console.log("in nachfrage", userData.staatsoberhäupter[tradeOffer.nachfrage.staat][tradeOffer.nachfrage.index]);
                userData.staatsoberhäupter[tradeOffer.nachfrage.staat][tradeOffer.nachfrage.index]--;
                console.log("nach --", userData.staatsoberhäupter[tradeOffer.nachfrage.staat][tradeOffer.nachfrage.index]);
                //
                let newZeros = 0;
                for (let i = 0; i < userData.staatsoberhäupter[tradeOffer.nachfrage.staat].length; i++) {
                    newZeros += userData.staatsoberhäupter[tradeOffer.nachfrage.staat][i];
                }
                console.log("nach for1");
                if (newZeros === 0) delete userData.staatsoberhäupter[tradeOffer.nachfrage.staat];
                //
                console.log("nach delete");
                if (senderData.staatsoberhäupter.hasOwnProperty(tradeOffer.nachfrage.staat)) {
                    console.log("in if");
                    senderData.staatsoberhäupter[tradeOffer.nachfrage.staat][tradeOffer.nachfrage.index]++;
                } else {
                    console.log("in else");
                    let zeroArray = [];
                    console.log(tradeOffer);
                    console.log("for for");
                    for (let i = 0; i < userData.staatsoberhäupter[tradeOffer.nachfrage.staat].length; i++) zeroArray.push(0);
                    senderData.staatsoberhäupter[tradeOffer.nachfrage.staat] = zeroArray;
                    console.log("senderd = zeroarray naxg");
                    senderData.staatsoberhäupter[tradeOffer.nachfrage.staat][tradeOffer.nachfrage.index]++;
                    console.log("letztes");
                }
            } else {
                senderData.levelPoints += tradeOffer.nachfrage;
                userData.levelPoints -= tradeOffer.nachfrage;
            }
            let filePath = "./resources/userData/" + message.guild.id + "/";
            console.log("vor writefile");
            fs.writeFileSync(filePath + userData.id + ".json", JSON.stringify(userData));
            console.log("zweichen writefile");
            fs.writeFileSync(filePath + senderData.id + ".json", JSON.stringify(senderData));
            console.log("nach writefile");

            sender.send("Der User '" + getUserData(message, "nickname") + "' hat dein Tauschangebot angenommen!")
            message.reply("Du hast das Angebot von '" + senderData.nickname + "' angenommen!");
        }
    },
    {
        name: "tradereject",
        aliases: ["tr", "tradedecline"],
        alwaysTrigger: false,
        command: async (message, client, args) => {
            if (args.length === 0) {
                message.reply("Du hast keine Zahl angegeben!");
                return;
            }
            if (isNaN(args[0])) {
                message.reply("Bitte gib die Nummer des trades an, den du Ablehnen möchtest!");
                return;
            }

            let openTrades = getUserData(message, "openTrades");
            if (openTrades.length === 0) {
                message.reply("Du hast keine offenen Tauschanfragen!");
                return;
            }
            if (args[0] - 1 > openTrades.length - 1) {
                message.reply("Du hast keine Tauschanfrage mit der Nummer " + args[0] + "! Sieh nochmal bei /trades nach.");
                return;
            }
            let tradeOffer = openTrades[args[0] - 1];
            openTrades.splice(args[0] - 1, 1);
            setUserData(message, "openTrades", openTrades);

            let sender = await client.users.fetch(tradeOffer.von);
            const fs = require("fs");
            let senderData = JSON.parse(fs.readFileSync("./resources/userData/" + message.guild.id + "/" + sender.id + ".json"));

            sender.send("Der User '" + getUserData(message, "nickname") + "' hat dein Tauschangebot abgelehnt!")
            message.reply("Du hast das Angebot von '" + senderData.nickname + "' abgelehnt!");
        }
    },
    {
        name: "achievments",
        aliases: ["a", "achievs", "achievements"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            let achievments = require("./achievments.js");
            const fs = require("fs");
            let userData = getAllUserData(message);

            let fields = [];
            let fields2 = [];
            let fields3 = [];
            let fields4 = [];

            /////////////// Filling the fields
            let halfWay = 15;
            for (let i = 0; i < halfWay; i++) {
                let preText = "```diff\n- ";
                if (achievments[i].progress(userData.staatsoberhäupter).unlocked) preText = "```fix\n"
                let unlocked = false;
                if (userData.unlockedAchievments.includes(i)) unlocked = true;
                if (unlocked) preText = "```diff\n+ ";
                fields.push({ "name": achievments[i].name + " (" + achievments[i].points + " Punkte)", "value": preText + achievments[i].description + "\n```" });
            }

            for (let i = halfWay; i < staatsoberhäupterListe.length; i++) {
                let preText = "```diff\n- ";
                if (achievments[i].progress(userData.staatsoberhäupter).unlocked) preText = "```fix\n"
                let unlocked = false;
                if (userData.unlockedAchievments.includes(i)) unlocked = true;
                if (unlocked) preText = "```diff\n+ ";
                fields2.push({ "name": achievments[i].name + " (" + achievments[i].points + " Punkte)", "value": preText + achievments[i].description + "\n```" });
            }

            for (let i = staatsoberhäupterListe.length; i < staatsoberhäupterListe.length + 10; i++) {
                let preText = "```diff\n- ";
                if (achievments[i].progress(userData.staatsoberhäupter).unlocked) preText = "```fix\n"
                let unlocked = false;
                if (userData.unlockedAchievments.includes(i)) unlocked = true;
                if (unlocked) preText = "```diff\n+ ";
                fields3.push({ "name": achievments[i].name + " (" + achievments[i].points + " Punkte)", "value": preText + achievments[i].description + "\n```" });
            }

            for (let i = staatsoberhäupterListe.length + 10; i < staatsoberhäupterListe.length + 10 + 24; i++) {
                let preText = "```diff\n- ";
                if (achievments[i].progress(userData.staatsoberhäupter).unlocked) preText = "```fix\n"
                let unlocked = false;
                if (userData.unlockedAchievments.includes(i)) unlocked = true;
                if (unlocked) preText = "```diff\n+ ";
                fields4.push({ "name": achievments[i].name + " (" + achievments[i].points + " Punkte)", "value": preText + achievments[i].description + "\n```" });
            }

            for (let i = staatsoberhäupterListe.length + 10 + 24; i < staatsoberhäupterListe.length + 10 + 24 + 3; i++) {
                let preText = "```diff\n- ";
                if (achievments[i].progress(userData.staatsoberhäupter).unlocked) preText = "```fix\n"
                let unlocked = false;
                if (userData.unlockedAchievments.includes(i)) unlocked = true;
                if (unlocked) preText = "```diff\n+ ";
                fields3.push({ "name": achievments[i].name + " (" + achievments[i].points + " Punkte)", "value": preText + achievments[i].description + "\n```" });
            }
            //////////////////// End of filling

            const embed = {
                "title": "`Sammle Alle von einem Land Achievments:`",
                "color": 6744043,
                "fields": fields
            }
            const embed2 = {
                "title": "`Sammle Alle von einem Land Achievments (2):`",
                "color": 6744043,
                "fields": fields2
            }
            const embed3 = {
                "title": "`Andere Achievments:`",
                "color": 6744043,
                "fields": fields3
            }
            const embed4 = {
                "title": "`Samme Hälfte von einem Land Achievments:`",
                "color": 6744043,
                "fields": fields4
            }
            message.author.send("Um ein Achievment freizuschalten Benutz /unlock [Achievment-Name]");
            message.author.send({ embed: embed });
            message.author.send({ embed: embed2 });
            message.author.send({ embed: embed4 });
            message.author.send({ embed: embed3 });
            message.reply("Deine Achievment-Daten wurden dir zugeschickt!");
        }
    },
    {
        name: "unlock",
        aliases: ["u"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            const fs = require("fs");
            let achievments = require("./achievments.js");
            let userData = getAllUserData(message);

            if (args.length === 0) {
                message.reply("Du hast den Namen des Achievments, das du freischalten möchtest nicht angegeben!");
                return;
            }

            let index = -1;
            for (let i = 0; i < achievments.length; i++) {
                if (args[0].toLowerCase() === achievments[i].name.toLowerCase()) {
                    index = i;
                    break;
                }
            }
            if (index === -1) {
                message.reply("Vertippt? Das achievment '" + args[0] + "' gibt es nicht!");
                return;
            }

            if (userData.unlockedAchievments.includes(index)) {
                message.reply("Du hast das achievment '" + achievments[index].name + "' bereits!");
                return;
            }

            let progress = achievments[index].progress(userData.staatsoberhäupter);
            if (progress.unlocked) {
                message.reply("Du hast das achievment '" + achievments[index].name + "' freigeschaltet!\n Du bekommst " + achievments[index].points + " Punkte!");
                userData.unlockedAchievments.push(index);
                userData.levelPoints += achievments[index].points;
                let filePath = "./resources/userData/" + message.guild.id + "/" + message.author.id + ".json";
                fs.writeFileSync(filePath, JSON.stringify(userData));
            } else {
                message.reply("Du kannst das achievment '" + achievments[index].name + "' noch nicht Freischalten!\n" + progress.answer);
            }
        }
    },
    {
        name: "listall",
        aliases: ["la"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            if (args.length === 0) {
                let string = "";
                for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                    let land = staatsoberhäupterListe[i].list;
                    if (land.split(" ").length > 1) land = land.split(" ")[1];
                    string += (land + ", ");
                }
                string = string.substring(0, string.length - 2);
                string += ".";
                message.reply("Gib bitte eins dieser Länder an:\n" + string);
                return;
            } else {
                let index = -1;
                let land;
                for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                    if (staatsoberhäupterListe[i].list.split(" ").length > 1) {
                        if (staatsoberhäupterListe[i].list.split(" ")[1].toLowerCase() === args[0].toLowerCase()) {
                            index = i;
                            land = staatsoberhäupterListe[i].list;
                            break;
                        }
                    } else {
                        if (staatsoberhäupterListe[i].list.toLowerCase() === args[0].toLowerCase()) {
                            index = i;
                            land = staatsoberhäupterListe[i].list;
                            break;
                        }
                    }
                }
                if (index === -1) {
                    message.reply("**Vertippt?** Das Land '" + args[0] + "' gibt es nicht.");
                    return;
                }
                let gezogene;
                if (message.mentions.users.first()) {
                    if (!message.guild.member(message.mentions.users.first().id)) {
                        message.reply("Der angegebene User ist nicht auf diesem Server!");
                        return;
                    }
                    const fs = require("fs");
                    let filePath = "./resources/userData/" + message.guild.id + "/" + message.mentions.users.first().id + ".json";
                    gezogene = JSON.parse(fs.readFileSync(filePath)).staatsoberhäupter;
                } else {
                    gezogene = getUserData(message, "staatsoberhäupter");
                }
                let stringArray = [];
                if (gezogene.hasOwnProperty(land)) {
                    for (let i = 0; i < staatsoberhäupterListe[index].names.length; i++) {
                        if (gezogene[land][i] > 0) {
                            stringArray.push("+ " + (i + 1) + ". " + staatsoberhäupterListe[index].names[i]);
                        } else {
                            stringArray.push("- " + (i + 1) + ". " + staatsoberhäupterListe[index].names[i]);
                        }
                    }
                } else {
                    for (let i = 0; i < staatsoberhäupterListe[index].names.length; i++) {
                        stringArray.push("- " + (i + 1) + ". " + staatsoberhäupterListe[index].names[i]);
                    }
                }
                let string = stringArray.join("\n");
                if (string.length > 2000) {
                    while (string.length > 2000) {
                        let split = string.substring(0, 1900);
                        split = "```diff\n" + split + "\n```";
                        string = string.substring(1900);
                        message.author.send(split);
                    }
                    string = "```diff\n" + string + "\n```";
                    message.author.send(string);
                    if (message.mentions.users.first()) {
                        message.reply("Ich hab dir eine Liste der Staatsoberhäupter von " + message.mentions.users.first().tag + "  aus " + staatsoberhäupterListe[index].list + " zugeschickt!");
                    } else {
                        message.reply("Ich hab dir eine Liste der Staatsoberhäupter von " + staatsoberhäupterListe[index].list + " zugeschickt!");
                    }
                    return;
                } else {
                    string = "```diff\n" + string + "\n```";
                    if (message.mentions.users.first()) {
                        message.author.send("Die Staatsoberhäupter von " + message.mentions.users.first().tag + " aus " + staatsoberhäupterListe[index].list + ":\n" + string);
                        message.reply("Ich hab dir eine Liste der Staatsoberhäupter von " + message.mentions.users.first().tag + "  aus " + staatsoberhäupterListe[index].list + " zugeschickt!");
                    } else {
                        message.author.send("Die Staatsoberhäupter von " + staatsoberhäupterListe[index].list + ":\n" + string);
                        message.reply("Ich hab dir eine Liste der Staatsoberhäupter von " + staatsoberhäupterListe[index].list + " zugeschickt!");
                    }
                }
            }
        }
    },
    {
        name: "si",
        aliases: [],
        alwaysTrigger: false,
        command: (message) => {
            message.reply("Digga ich kann kein Spanisch");
        }
    },
    {
        name: "search",
        aliases: ["s", "such"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            if (args.length === 0) {
                message.reply("Gib bitte an was du suchen möchtest! (Ein Land oder ein Staatsoberhaupt)");
                return;
            }
            if (!isNaN(args[0])) {
                message.reply("'" + args[0] + "' ist weder ein Land noch ein Name!");
                return;
            }
            let query = args.join(" ").toLowerCase();
            const staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            const fs = require("fs");
            let filePath = "./resources/userData/" + message.guild.id
            let files = fs.readdirSync(filePath);
            let string = "```fix\n";
            for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                if (staatsoberhäupterListe[i].list.toLowerCase() === query || (staatsoberhäupterListe[i].list.split(" ").length > 1 && staatsoberhäupterListe[i].list.split(" ")[1].toLowerCase() === query)) {
                    //query ist ein land
                    query = staatsoberhäupterListe[i].list;
                    let atleastOne = false;
                    for (file of files) {
                        const readFile = JSON.parse(fs.readFileSync(filePath + "/" + file));
                        let gezogene = readFile.staatsoberhäupter;
                        if (gezogene.hasOwnProperty(query)) {
                            atleastOne = true;
                            let counter = 0;
                            for (let j = 0; j < gezogene[query].length; j++) counter += gezogene[query][j];
                            string += readFile["nickname"] + ": " + counter + "\n";
                        }
                    }
                    string += "```";
                    if (atleastOne) {
                        message.author.send("Folgende User haben Staatsoberhäupter aus " + query + ":\n" + string);
                        message.reply("Ich hab dir die Suchergebnisse zugeschickt!");
                        return;
                    } else {
                        message.reply("Niemand hat ein Staatsoberhaupt aus " + query + "!");
                        return;
                    }
                }
            }
            //query ist kein land
            let land;
            let index;
            let found = false;
            for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                for (let j = 0; j < staatsoberhäupterListe[i].names.length; j++) {
                    if (query === staatsoberhäupterListe[i].names[j].toLowerCase()) {
                        land = staatsoberhäupterListe[i].list;
                        index = j;
                        found = true;
                    }
                }
            }
            if (!found) {
                message.reply("Das Staatsoberhaupt '" + query + "' scheint es nicht zu Geben! Achte auf Sonderzeichen!");
                return;
            } else {
                let atleastOne = false;
                for (file of files) {
                    const readFile = JSON.parse(fs.readFileSync(filePath + "/" + file));
                    let gezogene = readFile.staatsoberhäupter;
                    if (gezogene.hasOwnProperty(land)) {
                        if (gezogene[land][index] > 0) {
                            string += readFile["nickname"] + ": " + gezogene[land][index] + "\n";
                            atleastOne = true;
                        }
                    }
                }
                string += "```";
                if (atleastOne) {
                    message.author.send("Folgende User haben das Staatsoberhaupt '" + query + "':\n" + string);
                    message.reply("Ich hab dir die Suchergebnisse zugeschickt!");
                    return;
                } else {
                    message.reply("Niemand hat das Staatsoberhaupt '" + query + "'!");
                    return;
                }
            }
        }
    }
];