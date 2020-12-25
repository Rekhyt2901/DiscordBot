const fetch = require("node-fetch");
module.exports = {
    FAQ: [
        {
            question: "hello there",
            answer: "General Kenobi!"
        },
        {
            question: "ist alex cool",
            answer: "Er ist der coolste!"
        },
        {
            question: "wie schnell ist das",
            answer: "Das Schiff machte den Kessel-Flug in weniger als 12 Parsec."
        },
        {
            question: "magst du sand",
            answer: "Ich mag Sand nicht. Er ist kratzig und rau und unangenehm. Er ist einfach überall. Nicht so wie hier. Hier ist alles ganz weich und eben."
        },
        {
            question: "ist heute dienstag",
            answer: new Date().getDay() === 2 ? "jo" : "neee"
        },
        {
            question: "welcher tag ist heute",
            answer: new Date().toLocaleString('de', { weekday: 'long' })
        },
        {
            question: "wieviel wiege ich",
            answer: function() {return ("ich schätze ca. " + (Math.floor(Math.random()*20) + 50) + "kg.")}
        },
        {
            question: "did you ever hear the tragedy of darth plagueis the wise",
            answer: "I thought not. It’s not a story the Jedi would tell you. It’s a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life… He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful… the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. Ironic. He could save others from death, but not himself."
        },
        {
            question: "What drink do you want",
            answer: "Vodka Martini shaken not stirred"
        },
        {
            question: "Mein Vater war ein großer Mann",
            answer: "Ihr Vater war recht klein"
        },
        {
            question: "Wie ist das Wetter",
            answer: async () => {
                try {
                    let key = require("./../config.json").weatherToken;
                    let path = "http://api.openweathermap.org/data/2.5/weather?q=Dortmund,de&appid=" + key + "&units=metric&lang=de";
                    console.log(path);
                    let data = await fetch(path);
                    data = await data.json();
                    let answer = data.weather[0].description + ".\nEs sind " + Math.round(data.main.temp) + "°C. Es fühlt sich an wie " + Math.round(data.main.feels_like) + "°C. Die Luftfeuchtigkeit liegt bei " + data.main.humidity + "%. Die Windgeschwindigkeit beträgt " + Math.round(data.wind.speed * 3.6) + "km/h.";
                    return answer;
                } catch(err) {
                    console.log(err);
                    return "Fehler bei der Datenabfrage.";
                }
            }
        },
        {
            question: "test",
            answer: "ich laufe!"
        }
    ]
}