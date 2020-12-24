"use strict";

function sammleAlleVonLandProgress(land, gezogene) {
  var staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

  if (gezogene.hasOwnProperty(land)) {
    var counter = 0;

    for (var i = 0; i < gezogene[land].length; i++) {
      if (gezogene[land][i] > 0) counter++;
    }

    return {
      answer: "Du hast " + counter + "/" + gezogene[land].length + " Staatsoberhäuptern aus " + land + "!",
      unlocked: Boolean(counter >= gezogene[land].length)
    };
  } else {
    var index = 0;

    for (var _i = 0; _i < staatsoberhäupterListe.length; _i++) {
      if (staatsoberhäupterListe[_i].list === land) {
        index = _i;
        break;
      }
    }

    return {
      answer: "Du hast 0/" + staatsoberhäupterListe[index].names.length + " Staatsoberhäuptern aus " + land + "!",
      unlocked: false
    };
  }
}

function sammleAnzahl(anzahlNötig, gezogene) {
  var counter = 0;

  for (land in gezogene) {
    for (var i = 0; i < gezogene[land].length; i++) {
      if (gezogene[land][i] > 0) counter++;
    }
  }

  return {
    answer: "Du hast " + counter + "/" + anzahlNötig + " benötigten Staatsoberhäupter!",
    unlocked: Boolean(counter >= anzahlNötig)
  };
}

module.exports = [{
  name: "Lettland",
  description: "Sammle alle Staatsoberhäupter von Lettland",
  progress: function progress(gezogene) {
    var land = "Lettland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 500
}, {
  name: "Japan",
  description: "Sammle alle Staatsoberhäupter von Japan",
  progress: function progress(gezogene) {
    var land = "Japan";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 2500
}, {
  name: "Vatikan",
  description: "Sammle alle Staatsoberhäupter von dem Vatikan ",
  progress: function progress(gezogene) {
    var land = "dem Vatikan";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 7500
}, {
  name: "Deutschland",
  description: "Sammle alle Staatsoberhäupter von Deutschland",
  progress: function progress(gezogene) {
    var land = "Deutschland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 500
}, {
  name: "UdSSR",
  description: "Sammle alle Staatsoberhäupter von der UdSSR",
  progress: function progress(gezogene) {
    var land = "der UdSSR";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 500
}, {
  name: "DDR",
  description: "Sammle alle Staatsoberhäupter von der DDR",
  progress: function progress(gezogene) {
    var land = "der DDR";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 400
}, {
  name: "Österreich",
  description: "Sammle alle Staatsoberhäupter von Österreich",
  progress: function progress(gezogene) {
    var land = "Österreich";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1000
}, {
  name: "Burundis",
  description: "Sammle alle Staatsoberhäupter von Burundis",
  progress: function progress(gezogene) {
    var land = "Burundis";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 500
}, {
  name: "Römisches Reich",
  description: "Sammle alle Staatsoberhäupter von dem Römischen Reich",
  progress: function progress(gezogene) {
    var land = "Rom";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 2500
}, {
  name: "Guatemala",
  description: "Sammle alle Staatsoberhäupter von Guatemala",
  progress: function progress(gezogene) {
    var land = "Guatemala";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1500
}, {
  name: "Chile",
  description: "Sammle alle Staatsoberhäupter von Chile",
  progress: function progress(gezogene) {
    var land = "Chile";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1500
}, {
  name: "Estland",
  description: "Sammle alle Staatsoberhäupter von Estland",
  progress: function progress(gezogene) {
    var land = "Estland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 400
}, {
  name: "Litauen",
  description: "Sammle alle Staatsoberhäupter von Litauen",
  progress: function progress(gezogene) {
    var land = "Litauen";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1000
}, {
  name: "Schweden",
  description: "Sammle alle Staatsoberhäupter von Schweden",
  progress: function progress(gezogene) {
    var land = "Schweden";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 2500
}, {
  name: "Portugal",
  description: "Sammle alle Staatsoberhäupter von Portugal",
  progress: function progress(gezogene) {
    var land = "Portugal";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 750
}, {
  name: "England",
  description: "Sammle alle Staatsoberhäupter von England",
  progress: function progress(gezogene) {
    var land = "England";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 2000
}, {
  name: "Tuvalu",
  description: "Sammle alle Staatsoberhäupter von Tuvalu",
  progress: function progress(gezogene) {
    var land = "Tuvalu";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 600
}, {
  name: "Marschalla",
  description: "Sammle alle Staatsoberhäupter von den Marschall Inseln",
  progress: function progress(gezogene) {
    var land = "Marschalla";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 600
}, {
  name: "Nordkorea",
  description: "Sammle alle Staatsoberhäupter von Nord Korea",
  progress: function progress(gezogene) {
    var land = "Nordkorea";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 400
}, {
  name: "Zazland",
  description: "Sammle alle Staatsoberhäupter von dem Zazland",
  progress: function progress(gezogene) {
    var land = "dem Zazland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1000
}, {
  name: "Nazideutschland",
  description: "Sammle alle Staatsoberhäupter von dem Dritten Reich",
  progress: function progress(gezogene) {
    var land = "Nazideutschland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 100
}, {
  name: "Kurdistan",
  description: "Sammle alle Staatsoberhäupter von Kurdistan",
  progress: function progress(gezogene) {
    var land = "Kurdistan";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 100
}, {
  name: "USA",
  description: "Sammle alle Staatsoberhäupter von den USA",
  progress: function progress(gezogene) {
    var land = "den USA";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1250
}, {
  name: "Frankreich",
  description: "Sammle alle Staatsoberhäupter von Frankreich",
  progress: function progress(gezogene) {
    var land = "Frankreich";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 2500
}, {
  name: "Finnland",
  description: "Sammle alle Staatsoberhäupter von Finnland",
  progress: function progress(gezogene) {
    var land = "Finnland";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 600
}, {
  name: "Bhutan",
  description: "Sammle alle Staatsoberhäupter von Bhutan",
  progress: function progress(gezogene) {
    var land = "Bhutan";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 500
}, {
  name: "Thailand",
  description: "Sammle alle Staatsoberhäupter von Thailand",
  progress: function progress(gezogene) {
    var land = "Thailand";
    return sammleAlleVonLandProgress(land, gezogene);
  },
  points: 1500
}, {
  name: "Erste-Oberhäupter",
  description: "Sammle das erste Oberhaupt jedes Landes",
  progress: function progress(gezogene) {
    var staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

    var counter = 0;

    for (land in gezogene) {
      if (gezogene.hasOwnProperty(land)) {
        if (gezogene[land][0] > 0) counter++;
      }
    }

    return {
      answer: "Du hast " + counter + "/" + staatsoberhäupterListe.length + "erste Staatsoberhäupter!",
      unlocked: Boolean(counter >= staatsoberhäupterListe.length)
    };
  },
  points: 2000
}, {
  name: "Aktuelle-Oberhäupter",
  description: "Sammle das aktuelle Oberhaupt jedes Landes",
  progress: function progress(gezogene) {
    var staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

    var counter = 0;

    for (land in gezogene) {
      if (gezogene.hasOwnProperty(land)) {
        if (gezogene[land][gezogene[land].length - 1] > 0) counter++;
      }
    }

    return {
      answer: "Du hast " + counter + "/" + staatsoberhäupterListe.length + "aktuelle Staatsoberhäupter!",
      unlocked: Boolean(counter >= staatsoberhäupterListe.length)
    };
  },
  points: 2000
}, {
  name: "jedes-Land",
  description: "Sammle ein Oberhaupt aus jedem Land",
  progress: function progress(gezogene) {
    var staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

    var counter = 0;

    for (land in gezogene) {
      if (gezogene.hasOwnProperty(land)) {
        var gotCountry = false;

        for (var i = 0; i < gezogene[land].length; i++) {
          if (gezogene[land][i] > 0) {
            gotCountry = true;
            break;
          }
        }

        if (gotCountry) counter++;
      }
    }

    return {
      answer: "Du hast ein Staatsoberhaupt aus " + counter + "/" + staatsoberhäupterListe.length + " Ländern!",
      unlocked: Boolean(counter >= staatsoberhäupterListe.length)
    };
  },
  points: 1000
}, {
  name: "10",
  description: "Sammle 10 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(10, gezogene);
  },
  points: 300
}, {
  name: "20",
  description: "Sammle 20 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(20, gezogene);
  },
  points: 500
}, {
  name: "50",
  description: "Sammle 50 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(50, gezogene);
  },
  points: 800
}, {
  name: "100",
  description: "Sammle 10 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(100, gezogene);
  },
  points: 1500
}, {
  name: "200",
  description: "Sammle 200 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(200, gezogene);
  },
  points: 3000
}, {
  name: "500",
  description: "Sammle 500 verschiedene Oberhäupter",
  progress: function progress(gezogene) {
    return sammleAnzahl(500, gezogene);
  },
  points: 5000
}, {
  name: "ALLEOBERHÄUPTER",
  description: "Sammle ALLE Oberhäupter",
  progress: function progress(gezogene) {
    var staatsoberhäupterListe = require("./staatsoberhäupter.json").staatsoberhäupter;

    var anzahl = 0;

    for (var i = 0; i < staatsoberhäupterListe.length; i++) {
      anzahl += staatsoberhäupterListe[i].names.length;
    }

    return sammleAnzahl(anzahl, gezogene);
  },
  points: 100000
}];