const fs = require('fs');
let players = []
let totalClicks = 0;

function updateSaveFile() {
    let json = JSON.stringify(players);
    fs.writeFile('./models/players.json', json, function(err) {
        if (err) throw err;
    });
}
setInterval(updateSaveFile, 30000);

module.exports = {
    setup() {
        const data = fs.readFileSync('./models/players.json', 'utf8');
        if (data) {
            players = JSON.parse(data);
        }
    },

    generateId() {
        function generate() {
            let S4 = function() {
                return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
             }
             return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        const id = generate();
        return id;
    },

    playerExists(idToFind) {
        for (i in players) {
            if (players[i].id === idToFind) {
                return true;
            }
        }
        return false;
    },

    createPlayer(id, name) {
        const player  = {
            "id": id,
            "name": name,
            "points": 20
        };
        players.push(player);
    },

    editPoints(id) {
        totalClicks += 1;
        let pointsWon = 0;
        for (i in players) {
            if (players[i].id === id) {
                players[i].points -= 1;
                if (totalClicks % 500 === 0) {
                    players[i].points += 250;
                    pointsWon = 250;
                } else if (totalClicks % 100 === 0) {
                    players[i].points += 40;
                    pointsWon = 40;
                } else if (totalClicks % 10 === 0) {
                    players[i].points += 5;
                    pointsWon = 5;
                }
                return [players[i].points, pointsWon];
            }
        }
    },

    nextWin() {
        let pointsUntilWin = 0;
        while (true) {
            if ((totalClicks + pointsUntilWin) % 10 === 0) {
                if (pointsUntilWin === 0) {
                    return 10;
                } else {
                    return pointsUntilWin;
                }
            }
            pointsUntilWin += 1;
        }
    },

    getPoints(id) {
        for (i in players) {
            if (players[i].id === id) {
                return players[i].points;
            }
        }
        return 0;
    },

    resetPoints(id) {
        for (i in players) {
            if (players[i].id === id) {
                players[i].points = 20;
            }
        }
    },

    getHighscores() {
        players.sort(function(a, b) {
            return a.points <= b.points;
        });
        highscoreArray = [];
        for (i = 0; i < 5; i++) {
            if (i === players.length) {
                break;
            }
            let parsedPlayer = {
                "name": players[i].name,
                "points": players[i].points
            };
            highscoreArray.push(parsedPlayer);
        }
        return highscoreArray;
    }
}