const fs = require('fs');
let players = []
let totalClicks = 0;

module.exports = {
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

    createPlayer(id) {
        const player  = {
            "id": id,
            "points": 20
        };
        players.push(player);
        return;
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
                return [players[index].points, pointsWon];
            }
        }
        return 0;
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
            }
        }
    }
}