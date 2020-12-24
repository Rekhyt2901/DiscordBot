function sammleAlleVonLand(land, gezogene) {
    let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
    if (gezogene.hasOwnProperty(land)) {
        let counter = 0;
        for (let i = 0; i < gezogene[land].length; i++) {
            if (gezogene[land][i] > 0) counter++;
        }
        return { answer: "Du hast " + counter + "/" + gezogene[land].length + " Staatsoberhäuptern aus " + land + "!", unlocked: Boolean(counter >= gezogene[land].length) };
    } else {
        let index = 0;
        for(let i = 0; i < staatsoberhäupterListe.length; i++) {
            if(staatsoberhäupterListe[i].list === land) {
                index = i;
                break;
            }
        }
        return { answer: "Du hast 0/" + staatsoberhäupterListe[index].names.length + " Staatsoberhäuptern aus " + land + "!", unlocked: false }
    }
}
function sammleHalbeVonLand(land, gezogene) {
    let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
    if (gezogene.hasOwnProperty(land)) {
        let counter = 0;
        for (let i = 0; i < gezogene[land].length; i++) {
            if (gezogene[land][i] > 0) counter++;
        }
        return { answer: "Du hast " + counter + "/" + Math.round(gezogene[land].length/2) + " Staatsoberhäuptern aus " + land + "!", unlocked: Boolean(counter >= Math.round(gezogene[land].length/2)) };
    } else {
        let index = 0;
        for(let i = 0; i < staatsoberhäupterListe.length; i++) {
            if(staatsoberhäupterListe[i].list === land) {
                index = i;
                break;
            }
        }
        return { answer: "Du hast 0/" + Math.round(staatsoberhäupterListe[index].names.length/2) + " Staatsoberhäuptern aus " + land + "!", unlocked: false }
    }
}

function sammleAnzahl(anzahlNötig, gezogene) {
    let counter = 0;
    for (land in gezogene) {
        for (let i = 0; i < gezogene[land].length; i++) {
            if (gezogene[land][i] > 0) counter++;
        }
    }
    return { answer: "Du hast " + counter + "/" + anzahlNötig + " benötigten Staatsoberhäupter!", unlocked: Boolean(counter >= anzahlNötig) };
}

module.exports = [
    {
        name: "Lettland",
        description: "Sammle alle Staatsoberhäupter von Lettland",
        progress: (gezogene) => {
            let land = "Lettland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "Japan",
        description: "Sammle alle Staatsoberhäupter von Japan",
        progress: (gezogene) => {
            let land = "Japan";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 2500
    },
    {
        name: "Vatikan",
        description: "Sammle alle Staatsoberhäupter von dem Vatikan ",
        progress: (gezogene) => {
            let land = "dem Vatikan";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 7500
    },
    {
        name: "Deutschland",
        description: "Sammle alle Staatsoberhäupter von Deutschland",
        progress: (gezogene) => {
            let land = "Deutschland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "UdSSR",
        description: "Sammle alle Staatsoberhäupter von der UdSSR",
        progress: (gezogene) => {
            let land = "der UdSSR";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "DDR",
        description: "Sammle alle Staatsoberhäupter von der DDR",
        progress: (gezogene) => {
            let land = "der DDR";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 400
    },
    {
        name: "Österreich",
        description: "Sammle alle Staatsoberhäupter von Österreich",
        progress: (gezogene) => {
            let land = "Österreich";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Burundis",
        description: "Sammle alle Staatsoberhäupter von Burundis",
        progress: (gezogene) => {
            let land = "Burundis";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "Römisches Reich",
        description: "Sammle alle Staatsoberhäupter von dem Römischen Reich",
        progress: (gezogene) => {
            let land = "Rom";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 2500
    },
    {
        name: "Guatemala",
        description: "Sammle alle Staatsoberhäupter von Guatemala",
        progress: (gezogene) => {
            let land = "Guatemala";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1500
    },
    {
        name: "Chile",
        description: "Sammle alle Staatsoberhäupter von Chile",
        progress: (gezogene) => {
            let land = "Chile";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1500
    },
    {
        name: "Estland",
        description: "Sammle alle Staatsoberhäupter von Estland",
        progress: (gezogene) => {
            let land = "Estland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 400
    },
    {
        name: "Litauen",
        description: "Sammle alle Staatsoberhäupter von Litauen",
        progress: (gezogene) => {
            let land = "Litauen";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Schweden",
        description: "Sammle alle Staatsoberhäupter von Schweden",
        progress: (gezogene) => {
            let land = "Schweden";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 2500
    },
    {
        name: "Portugal",
        description: "Sammle alle Staatsoberhäupter von Portugal",
        progress: (gezogene) => {
            let land = "Portugal";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 750
    },
    {
        name: "England",
        description: "Sammle alle Staatsoberhäupter von England",
        progress: (gezogene) => {
            let land = "England";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 2000
    },
    {
        name: "Tuvalu",
        description: "Sammle alle Staatsoberhäupter von Tuvalu",
        progress: (gezogene) => {
            let land = "Tuvalu";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 600
    },
    {
        name: "Marschalla",
        description: "Sammle alle Staatsoberhäupter von den Marschall Inseln",
        progress: (gezogene) => {
            let land = "Marschalla";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 600
    },
    {
        name: "Nordkorea",
        description: "Sammle alle Staatsoberhäupter von Nord Korea",
        progress: (gezogene) => {
            let land = "Nordkorea";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 400
    },
    {
        name: "Zazland",
        description: "Sammle alle Staatsoberhäupter von dem Zazland",
        progress: (gezogene) => {
            let land = "dem Zazland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Nazideutschland",
        description: "Sammle alle Staatsoberhäupter von dem Dritten Reich",
        progress: (gezogene) => {
            let land = "Nazideutschland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 100
    },
    {
        name: "Kurdistan",
        description: "Sammle alle Staatsoberhäupter von Kurdistan",
        progress: (gezogene) => {
            let land = "Kurdistan";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 100
    },
    {
        name: "USA",
        description: "Sammle alle Staatsoberhäupter von den USA",
        progress: (gezogene) => {
            let land = "den USA";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1250
    },
    {
        name: "Frankreich",
        description: "Sammle alle Staatsoberhäupter von Frankreich",
        progress: (gezogene) => {
            let land = "Frankreich";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 2500
    },
    {
        name: "Finnland",
        description: "Sammle alle Staatsoberhäupter von Finnland",
        progress: (gezogene) => {
            let land = "Finnland";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 600
    },
    {
        name: "Bhutan",
        description: "Sammle alle Staatsoberhäupter von Bhutan",
        progress: (gezogene) => {
            let land = "Bhutan";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "Thailand",
        description: "Sammle alle Staatsoberhäupter von Thailand",
        progress: (gezogene) => {
            let land = "Thailand";
            return sammleAlleVonLand(land, gezogene);
        },
        points: 1500
    },
    {
        name: "Erste-Oberhäupter",
        description: "Sammle das erste Oberhaupt jedes Landes",
        progress: (gezogene) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            let counter = 0;
            for (land in gezogene) {
                if (gezogene.hasOwnProperty(land)) {
                    if (gezogene[land][0] > 0) counter++;
                }
            }
            return { answer: "Du hast " + counter + "/" + staatsoberhäupterListe.length + "erste Staatsoberhäupter!", unlocked: Boolean(counter >= staatsoberhäupterListe.length) };
        },
        points: 2000
    },
    {
        name: "Aktuelle-Oberhäupter",
        description: "Sammle das aktuelle Oberhaupt jedes Landes",
        progress: (gezogene) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            let counter = 0;
            for (land in gezogene) {
                if (gezogene.hasOwnProperty(land)) {
                    if (gezogene[land][gezogene[land].length - 1] > 0) counter++;
                }
            }
            return { answer: "Du hast " + counter + "/" + staatsoberhäupterListe.length + "aktuelle Staatsoberhäupter!", unlocked: Boolean(counter >= staatsoberhäupterListe.length) };
        },
        points: 2000
    },
    {
        name: "jedes-Land",
        description: "Sammle ein Oberhaupt aus jedem Land",
        progress: (gezogene) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            let counter = 0;
            for (land in gezogene) {
                if (gezogene.hasOwnProperty(land)) {
                    let gotCountry = false;
                    for (let i = 0; i < gezogene[land].length; i++) {
                        if (gezogene[land][i] > 0) {
                            gotCountry = true;
                            break;
                        }
                    }
                    if (gotCountry) counter++;
                }
            }
            return { answer: "Du hast ein Staatsoberhaupt aus " + counter + "/" + staatsoberhäupterListe.length + " Ländern!", unlocked: Boolean(counter >= staatsoberhäupterListe.length) }
        },
        points: 1000
    },
    {
        name: "10",
        description: "Sammle 10 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(10, gezogene);
        },
        points: 300
    },
    {
        name: "20",
        description: "Sammle 20 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(20, gezogene);
        },
        points: 500
    },
    {
        name: "50",
        description: "Sammle 50 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(50, gezogene);
        },
        points: 700
    },
    {
        name: "100",
        description: "Sammle 10 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(100, gezogene);
        },
        points: 1500
    },
    {
        name: "200",
        description: "Sammle 200 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(200, gezogene);
        },
        points: 3000
    },
    {
        name: "500",
        description: "Sammle 500 verschiedene Oberhäupter",
        progress: (gezogene) => {
            return sammleAnzahl(500, gezogene);
        },
        points: 5000
    },
    {
        name: "ALLEOBERHÄUPTER",
        description: "Sammle ALLE Oberhäupter",
        progress: (gezogene) => {
            let staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;
            let anzahl = 0;
            for (let i = 0; i < staatsoberhäupterListe.length; i++) {
                anzahl += staatsoberhäupterListe[i].names.length;
            }
            return sammleAnzahl(anzahl, gezogene);
        },
        points: 100000
    },
    {
        name: "Halb-Lettland",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Lettland",
        progress: (gezogene) => {
            let land = "Lettland";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-Japan",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Japan",
        progress: (gezogene) => {
            let land = "Japan";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Halb-Vatikan",
        description: "Sammle die Hälfte aller Staatsoberhäupter vom Vatikan",
        progress: (gezogene) => {
            let land = "dem Vatikan";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 3000
    },
    {
        name: "Halb-Deutschland",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Deutschland",
        progress: (gezogene) => {
            let land = "Deutschland";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-UdSSR",
        description: "Sammle die Hälfte aller Staatsoberhäupter von der UdSSR",
        progress: (gezogene) => {
            let land = "der UdSSR";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-DDR",
        description: "Sammle die Hälfte aller Staatsoberhäupter von der DDR",
        progress: (gezogene) => {
            let land = "der DDR";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 150
    },
    {
        name: "Halb-Österreich",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Österreich",
        progress: (gezogene) => {
            let land = "Österreich";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 350
    },
    {
        name: "Halb-Burundis",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Burundis",
        progress: (gezogene) => {
            let land = "Burundis";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-Rom",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Rom",
        progress: (gezogene) => {
            let land = "Rom";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Halb-Guatemala",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Guatemala",
        progress: (gezogene) => {
            let land = "Guatemala";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 650
    },
    {
        name: "Halb-Chile",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Chile",
        progress: (gezogene) => {
            let land = "Chile";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 650
    },
    {
        name: "Halb-Litauen",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Litauen",
        progress: (gezogene) => {
            let land = "Litauen";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 400
    },
    {
        name: "Halb-Schweden",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Schweden",
        progress: (gezogene) => {
            let land = "Schweden";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Halb-Portugal",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Portugal",
        progress: (gezogene) => {
            let land = "Portugal";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 250
    },
    {
        name: "Halb-England",
        description: "Sammle die Hälfte aller Staatsoberhäupter von England",
        progress: (gezogene) => {
            let land = "England";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 750
    },
    {
        name: "Halb-Tuvalu",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Tuvalu",
        progress: (gezogene) => {
            let land = "Tuvalu";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-Marschalla",
        description: "Sammle die Hälfte aller Staatsoberhäupter von den Marschall Inseln",
        progress: (gezogene) => {
            let land = "Marschalla";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-USA",
        description: "Sammle die Hälfte aller Staatsoberhäupter von den USA",
        progress: (gezogene) => {
            let land = "den USA";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 500
    },
    {
        name: "Halb-Frankreich",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Frankreich",
        progress: (gezogene) => {
            let land = "Frankreich";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 1000
    },
    {
        name: "Halb-Finnland",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Finnland",
        progress: (gezogene) => {
            let land = "Finnland";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-Bhutan",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Bhutan",
        progress: (gezogene) => {
            let land = "Bhutan";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 200
    },
    {
        name: "Halb-Thailand",
        description: "Sammle die Hälfte aller Staatsoberhäupter von Thailand",
        progress: (gezogene) => {
            let land = "Thailand";
            return sammleHalbeVonLand(land, gezogene);
        },
        points: 650
    }
]