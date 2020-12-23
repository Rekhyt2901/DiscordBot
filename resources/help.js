module.exports = (message, client, args) => {
    if (args.length === 0) {
        let embed = {
            "title": "Bot Befehle:",
            "description": "Um mehr über einen Befehl zu erfahren:\n/help [Befehl]",
            "color": 6744043,
            "fields": [
                {
                    "name": "/help",
                    "value": "Zeigt diese Nachricht an."
                },
                {
                    "name": "/staatsoberhaupt",
                    "value": "Zeigt ein zufälliges Staatsoberhaupt an."
                },
                {
                    "name": "/superstaatsoberhaupt",
                    "value": "Dasselbe wie /staatsoberhaupt, bloß dass es dreifache Punkte gibt. Ist einmal am Tag verfügbar."
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
                    "name": "/profile",
                    "value": "Gibt die eigenen Daten wieder."
                },
                {
                    "name": "/ranking",
                    "value": "Zeigt das aktuelle Punkte Ranking an."
                },
                {
                    "name": "/list",
                    "value": "Zeigt die Staatsoberhäupter in deinem Besitz an."
                },
                {
                    "name": "/listAll",
                    "value": "Zeigt alle Oberhäupter eines Landes an. Die die man schon hat werden grün markiert, die restlichen rot."
                },
                {
                    "name": "/trade",
                    "value": "Mache einem anderen User ein Tauscherangebot."
                },
                {
                    "name": "/trades",
                    "value": "Zeigt dir eine numerierte Liste der Tauschangebote an, die du erhalten hast."
                },
                {
                    "name": "/tradeAccept",
                    "value": "Akzeptiert das Tauschangebot mit der angegebenen Nummer."
                },
                {
                    "name": "/tradeReject",
                    "value": "Lehnt das Tauschangebot mit der angegeben Nummer ab."
                },
                {
                    "name": "/achievments",
                    "value": "Sendet dir eine liste aller Achievments zu und zeigt an welche du schon hast."
                },
                {
                    "name": "/unlock",
                    "value": "Schaltet das angegebene Achievment frei und gibt dir die Punkte dafür."
                }
            ]
        };
        message.reply({ embed: embed });
    } else {
        let embed;
        let arg = args[0].toLowerCase();
        if (arg.match(/^(help|h|\?)$/i)) {
            embed = {
                "title": "/help",
                "description": "Zeigt alle möglichen Befehle an. Kann auch nähere Informationen zu einem bestimmten Befehl geben.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/help, /h, /?"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Optional: Name des Befehls über den man nähere Informationen möchte."
                    }
                ]
            };
        } else if (arg.match(/^(staatsoberhaupt|so)$/i)) {
            embed = {
                "title": "/staatsoberhaupt",
                "description": "Gibt ein zufälliges Staatsoberhaupt aus einer Liste von über 1000 Oberhäuptern wieder, die hauptsächlich von Fabio und Laurenz erstellt wurde. Verlinkt auch den Wikipedia Artikel.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/staatsoberhaupt, /so"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(superstaatsoberhaupt|sso|superso)$/i)) {
            embed = {
                "title": "/staatsoberhaupt",
                "description": "Dasselbe wie /staatsoberhaupt, bloß dass es dreifache Punkte gibt. Ist einmal am Tag verfügbar. Wird um 00:00 Uhr resetet.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/superstaatsoberhaupt, /sso, /superso"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(skribbl)$/i)) {
            embed = {
                "title": "/skribbl",
                "description": "/skribbl startet die Wortaufnahme. In diesem Channel kann nun jeder Wörter schreiben die dann in die Liste aufgenommen werden. Nochmal /skribbl beendet die Aufnahme und gibt die richtig formattierte Liste der Wörter wieder.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/skribbl"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(randomimage|ri|img|randomimg|image)$/i)) {
            embed = {
                "title": "/randomimage",
                "description": "Zeigt ein zufälliges Bild an. Standardauflösung ist 1280x720. Mit Zahlen hinter dem Befehl kann die Auflösung geändert werden.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/randomimage, /ri, /img, /randomimg, /image"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Optional: 1. Zahl: Breite des Bildes\n2. Zahl: Höhe des bildes.\nWenn nur eine Zahl angegeben wird ist das Bild quadratisch."
                    }
                ]
            };
        } else if (arg.match(/^(profile|p)$/i)) {
            embed = {
                "title": "/profile",
                "description": "Zeigt die Punkte, das Beitrittsdatum, das Erstelldatum, den Tag und den Server Nickname des Users an.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/profile, /p/"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Optional: @mention zeigt das Profil des gementionten Users an."
                    }
                ]
            };
        } else if (arg.match(/^(ranking|r)$/i)) {
            embed = {
                "title": "/ranking",
                "description": "Zeigt die akutellen Punkte von allen Server Mitgliedern an.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/ranking, /r"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(list|l|li)$/i)) {
            embed = {
                "title": "/list",
                "description": "Zeigt dir zu jedem Land an, wieviele Staatsoberhäupter du in ihm hast.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/list, /l, /li"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Optional: Wenn ein Land angegeben wird, wird genau angezeigt welche Oberhäupter du in diesem Land hast.\n Optional: Wenn ein User @mentioned wird, wird seine Liste angezeigt."
                    }
                ]
            };
        } else if (arg.match(/^(trade|t)$/i)) {
            embed = {
                "title": "/trade",
                "description": "Lässt dich einem User den du mit @mentionst einen Tausch anbieten. Namen von Oberhäuptern müssen mit Bindestrichen getrennt werden (z.B. Donald-Trump)",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/trade, /t"
                    },
                    {
                        "name": "Argumente:",
                        "value": "1. Ein User den du mit @mentionst.\n2. Das was du bietest (z.B. Angela-Merkel oder 400 (für Punkte))\n3. Das was du möchtest (z.B. Kim-Jong-Un oder 350 (Punkte))"
                    }
                ]
            };
        } else if (arg.match(/^(trades|ts)$/i)) {
            embed = {
                "title": "/trades",
                "description": "Zeigt dir die Trades an, die dir andere Angeboten haben. Die Nummer des Trades steht dabei.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/trades, /ts"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(tradeaccept|ta)$/i)) {
            embed = {
                "title": "/tradeAccept",
                "description": "Akzeptiert das Tauschangebot mit der angegeben Nummer. Die Nummern sieht man bei /trades.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/tradeAccept, /ta"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Eine Zahö. Die nummer des Trades den du annehmen möchtest."
                    }
                ]
            };
        } else if (arg.match(/^(tradereject|tr)$/i)) {
            embed = {
                "title": "/tradeReject",
                "description": "Lehnt das Tauschangebot mit der angegeben Nummer ab. Die Nummern sieht man bei /trades.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/tradeReject, /tr"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Eine Zahl. Die Nummer des Trades den du ablehnen möchtest."
                    }
                ]
            };
        } else if (arg.match(/^(achievments|a|achievs)$/i)) {
            embed = {
                "title": "/achievments",
                "description": "Schickt dir alle Achievments zu. Grün ist schon freigeschaltet, Rot noch nicht verfügbar und Gelb kann jetzt freigeschaltet werden mit /unlock [name des Achievments]",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/achievments, /a, /achievs"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Keine."
                    }
                ]
            };
        } else if (arg.match(/^(unlock|u)$/i)) {
            embed = {
                "title": "/unlock",
                "description": "Schaltet das angegebene Achievment frei und schreibt dir die Punkte dafür gut. Du kannst jedes Achievment nur einmal freischalten!",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/unlock, /u"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Der Name des Achievments das du freischalten möchtest. Sieh dir die Namen bei /achievments an."
                    }
                ]
            };
        } else if (arg.match(/^(listall|la)$/i)) {
            embed = {
                "title": "/listAll",
                "description": "Zeigt alle Staatsoberhäupter des Angegeben Landes an. Die die man besitzt werden Grün markiert, der rest rot. Die Staatsoberhäupter sind numeriert. Wird kein Land angegeben, wird eine Liste der Länder angezeigt.",
                "color": 6744043,
                "fields": [
                    {
                        "name": "Aliase:",
                        "value": "/listall /la"
                    },
                    {
                        "name": "Argumente:",
                        "value": "Optional: @mention zeigt die Liste des gementionten Users an.\nEin Land. Das Land dessen Staatsoberhäupter du sehen möchtest."
                    }
                ]
            };
        } else {
            embed = {
                "title": "Den Befehl \"" + args[0] + "\" gibt es nicht.",
                "description": "Vertippt?",
                "color": 6744043,
            }
        }
        message.reply({ embed: embed });
    }
}