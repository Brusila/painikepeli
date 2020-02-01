const fs = require('fs');
let players = []
let totalClicks = 0;

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
        for (index in players) {
            if (players[index].id === idToFind) {
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
        let json = JSON.stringify(players);
        fs.writeFile('./models/players.json', json, function(err) {
            if (err) throw err;
        });
    },

    editPoints(id) {
        totalClicks += 1;
        let pointsWon = 0;
        for (index in players) {
            if (players[index].id === id) {
                players[index].points -= 1;
                if (totalClicks % 500 === 0) {
                    players[index].points += 250;
                    pointsWon = 250;
                } else if (totalClicks % 100 === 0) {
                    players[index].points += 40;
                    pointsWon = 40;
                } else if (totalClicks % 10 === 0) {
                    players[index].points += 5;
                    pointsWon = 5;
                }
                let json = JSON.stringify(players);
                fs.writeFile('./models/players.json', json, function(err) {
                    if (err) throw err;
                });
                return [players[index].points, pointsWon];
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
        for (index in players) {
            if (players[index].id === id) {
                return players[index].points;
            }
        }
        return 0;
    },

    resetPoints(id) {
        for (index in players) {
            if (players[index].id === id) {
                players[index].points = 20;
                let json = JSON.stringify(players);
                fs.writeFile('./models/players.json', json, function(err) {
                    if (err) throw err;
                });
            }
        }
    }
}