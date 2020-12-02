/*
command structure:

    name: name of the command,
    aliases: alternative names,
    alwaysTrigger: whether it is triggered without the prefix
    remember: data that has to be safed between function calls,
    command: function to be executed
        command function parameters: client Object, message Object, command arguments, remembered data, whether it was called without a prefix 

*/
module.exports = [
    {
        name: "help",
        aliases: ["h", "?"],
        alwaysTrigger: false,
        command: (message, client, args) => {

            const embed = {
                "title": "Bot Befehle:",
                "description": "Um mehr über einen Befehl zu erfahren:\n/help [Befehl]",
                "url": "",
                "color": 6744043,
                "fields": [
                    {
                        "name": "/help",
                        "value": "Zeigt diese Nachricht an."
                    },
                    {
                        "name": "/faq",
                        "value": "beeinhaltet die Logik für den Chatbot."
                    },
                    {
                        "name": "/staatsoberhaupt",
                        "value": "Zeigt ein zufälliges Staatsoberhaupt an."
                    },
                    {
                        "name": "/skribbl",
                        "value": "Fängt an oder hört auf Wörter für Skribbl.io aufzunehmen."
                    }
                ]
            };
            message.channel.send({ embed: embed });
        }
    },
    {
        name: "faq",
        aliases: [],
        alwaysTrigger: true,
        command: (message, client, args, remember, falseTriggered) => {
            if (falseTriggered) {
                let FAQ = require("./resources/FAQ.js").FAQ;
                for (item of FAQ) {
                    if (message.content.toLowerCase() === item.question.toLowerCase() || message.content.toLowerCase() === item.question.toLowerCase() + "?" || message.content.toLowerCase() === item.question.toLowerCase() + "!" || message.content.toLowerCase() === item.question.toLowerCase() + ".") {
                        if (item.answer instanceof Function) {
                            message.reply(item.answer());
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
        command: (message, client, args, remember, falseTriggered) => {
            let staatsoberhäupter = require("./resources/staatsoberhäupter.json").staatsoberhäupter;

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
            message.reply("Das " + (nameIndex + 1) + ". " + "Staatsoberhaupt von " + Land + " war " + Staatsoberhaupt + ".\n" + Link);
        }
    },
    {
        name: "skribbl",
        aliases: [],
        alwaysTrigger: true,
        remember: { recording: false, channelId: null, filePath: null },
        command: (message, client, args, remember, falseTriggered) => {
            let fs = require("fs");

            //Start recording
            if (!remember.recording && !falseTriggered) {
                remember.channelId = message.channel.id;
                if (!fs.existsSync("./resources/skribbl")) fs.mkdir("./resources/skribbl");
                remember.filePath = "./resources/skribbl/" + message.createdAt.toISOString().replace(/:|\./g, "-") + ".dat";
                console.log("Started Recording Words!");
                message.guild.channels.cache.get(remember.channelId).send("Started Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Return if not from same channel
            if (message.channel.id !== remember.channelId) {
                console.log("Message from wrong Channel!");
                return;
            }
            //Stop recording
            if (remember.recording && !falseTriggered) {
                message.guild.channels.cache.get(remember.channelId).send("Stopped recording Words!\n" + fs.readFileSync(remember.filePath) + "\n Play at https://skribbl.io/");
                console.log("stopped Recording Words!");
                remember.recording = !remember.recording;
                return;
            }
            //Write down word
            if (remember.recording && falseTriggered) {
                fs.appendFileSync(remember.filePath, message.content + ",");
                console.log("Added Word:" + message.content);
                return;
            }
        }
    }
]