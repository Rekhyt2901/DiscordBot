const { time } = require("console");
const { get } = require("http");

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
                    levelPoints: 0,
                    lastUsedStaatsoberhaupt: 0
                }
                fs.writeFileSync(filePath, JSON.stringify(data));
            }
        }
    },
    {
        name: "help",
        aliases: ["h", "?"],
        alwaysTrigger: false,
        command: (message, client, args) => {
            let embed;
            if (args.length === 0) {
                embed = {
                    "title": "Bot Befehle:",
                    "description": "Um mehr über einen Befehl zu erfahren:\n/help [Befehl]",
                    "color": 6744043,
                    "fields": [
                        {
                            "name": "/help",
                            "value": "Zeigt diese Nachricht an."
                        },
                        {
                            "name": "/faq",
                            "value": "Beeinhaltet die Logik für den Chatbot."
                        },
                        {
                            "name": "/staatsoberhaupt",
                            "value": "Zeigt ein zufälliges Staatsoberhaupt an."
                        },
                        {
                            "name": "/skribbl",
                            "value": "Fängt an oder hört auf Wörter für Skribbl.io aufzunehmen."
                        },
                        {
                            "name": "/randomimage",
                            "value": "Zeigt ein zufälliges Bild aus dem Internet an."
                        },
                        {
                            "name": "/userData",
                            "value": "Beeinhaltet die Logik für das Speichern der Daten der User."
                        }
                    ]
                };
            } else {
                let index;
                let arg = String(args[0]).toLowerCase();
                if (String(arg.match(/(help|h|\?)/))) {
                    index = 0;
                } else if (arg.match(/(faq)/)) {
                    index = 1;
                } else if (arg.match(/(staatsoberhaupt|so)/)) {
                    index = 2;
                } else if (arg.match(/(skribbl)/)) {
                    index = 3;
                } else if (arg.match(/(randomimage|ri|img|randomimg|image)/)) {
                    index = 4;
                } else if (arg.match(/(userData)/)) {
                    index = 5;
                } else {
                    index = null;
                }
                const titleArray = [
                    "/help",
                    "/faq",
                    "/staatsoberhaupt",
                    "/skribbl",
                    "/randomImage",
                    "/userData"
                ];
                const descriptionArray = [
                    "Zeigt alle möglichen Befehle an. Kann auch nähere Informationen zu einem bestimmten Befehl geben.",
                    "Ist nur der hintergrund Befehl für den Chatbot, der auf fragen antwortet, der Befehl an sich hat keine Funktion.",
                    "Gibt ein zufälliges Staatsoberhaupt aus einer Liste von über 1000 Oberhäuptern wieder, die hauptsächlich von Fabio und Laurenz erstellt wurde. Verlinkt auch den Wikipedia Artikel.",
                    "/skribbl startet die Wortaufnahme. In diesem Channel kann nun jeder Wörter schreiben die dann in die Liste aufgenommen werden. Nochmal /skribbl beendet die Aufnahme und gibt die richtig formattierte Liste der Wörter wieder.",
                    "Zeigt ein zufälliges Bild an. Standardauflösung ist 1280x720. Mit Zahlen hinter dem Befehl kann die Auflösung geändert werden.",
                    "Ist nur der hintergrund Befehl für das Speichern der Daten der einzelnen User, der Befehl an sich hat keine Funktion."
                ];
                const aliasArray = [
                    "/h, /?",
                    "Keine.",
                    "/so",
                    "Keine.",
                    "/ri, /img, /randomimg, /image",
                    "Keine"
                ];
                const argumentArray = [
                    "Optional: Name des Befehls über den man nähere Informationen möchte.",
                    "Keine.",
                    "Keine.",
                    "Keine.",
                    "Optional: 1. Zahl Breite des Bildes 2. Zahl Höhe des bildes. Wenn nur eine angegeben wird ist das Bild quadratisch.",
                    "Keine"
                ];
                embed = {
                    "title": "Bot Befehle: " + titleArray[index],
                    "description": descriptionArray[index],
                    "color": 6744043,
                    "fields": [
                        {
                            "name": "Aliase:",
                            "value": aliasArray[index]
                        },
                        {
                            "name": "Argumente:",
                            "value": argumentArray[index]
                        }
                    ]
                }
                if (index === null) {
                    embed = {
                        "title": "Den Befehl \"" + args[0] + "\" gibt es nicht.",
                        "description": "Vertippt?",
                        "color": 6744043,
                    }
                }
            }
            message.channel.send({ embed: embed });
        }
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
            if(timeElapsed < 1800000) {
                let timeToWait = Math.ceil((1800000 - timeElapsed) / 1000 / 60);
                message.reply("Du kannst in " + timeToWait + " Minuten nochmal ziehen!");
                return;
            }

            let numberOfNames = 0;
            for (i = 0; i < staatsoberhäupter.length; i++) {
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

            /* let first = Math.floor(Math.random() * staatsoberhäupter.length);
            let second = Math.floor(Math.random() * staatsoberhäupter[first].names.length);
    
            let Land = staatsoberhäupter[first].list;
            let Staatsoberhaupt = staatsoberhäupter[first].names[second]; */
            let points = Math.floor(((staatsoberhäupter[listIndex].names.length - nameIndex) / staatsoberhäupter[listIndex].names.length) * 100);
            if(Staatsoberhaupt.match(/(Adolf Hitler|Angela Merkel|Vladimir Putin|Franziskus|Wladimir Lenin|Josef Stalin|Elisabeth II\.|Kim Jong-Un|Alex Kleyn|Laurenz Schulz|nicht Niko, der keck wurde nie gewählt)/)) points = 150;

            message.reply("Das " + (nameIndex + 1) + ". " + "Staatsoberhaupt von " + Land + " war " + Staatsoberhaupt + ".\n Du hast " + points + " Punkte bekommen!" + "\n" + Link);

            setUserData(message, "levelPoints", getUserData(message, "levelPoints") + points);
            setUserData(message, "lastUsedStaatsoberhaupt", now);
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
                console.log("Started Recording Words!");
                message.guild.channels.cache.get(remember.channelId).send("Started Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Return if not from same channel
            if (message.channel.id !== remember.channelId && remember.recording) {
                console.log("Message from wrong Channel!");
                return;
            }
            //Stop recording
            if (remember.recording && !falseTriggered) {
                message.guild.channels.cache.get(remember.channelId).send("Stopped recording Words!\n" + (fs.existsSync(remember.filePath) ? fs.readFileSync(remember.filePath) : "No Words were recorded.") + "\nPlay at https://skribbl.io/");
                console.log("stopped Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Write down word
            if (remember.recording && falseTriggered && !startsWithPrefix) {
                fs.appendFileSync(remember.filePath, message.content + ",");
                console.log("Added Word:" + message.content);
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
            console.log("sent picture: " + data.url)
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
            let data = getAllUserData(message);
            const embed = {
                "title": "Dein Profil:",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Tag:",
                        "value": data.tag
                    },
                    {
                        "name": "Nickname:",
                        "value": message.member.nickname
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
                    }
                ]
            };
            message.reply({ embed: embed });
        }
    },
];