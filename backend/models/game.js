const fs = require('fs');

let players = [];
let totalClicks = 0;

const data = fs.readFileSync('./models/players.json', 'utf8');
if (data) {
  players = JSON.parse(data);
}

function updateSaveFile() {
  const json = JSON.stringify(players);
  fs.writeFile('./models/players.json', json, (err) => {
    if (err) throw err;
  });
}
// Update the file every 30 seconds
setInterval(updateSaveFile, 30000);

module.exports = {
  generateId() {
    // Generate an unique id for the cookie
    function generate() {
      const S4 = function randomize() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (`${S4() + S4()}-${S4()}-${S4()}-${S4()}-${S4()}${S4()}${S4()}`);
    }
    const id = generate();
    return id;
  },

  playerExists(idToFind) {
    if (players.find((player) => player.id === idToFind)) {
      return true;
    }
    return false;
  },

  createPlayer(id, name) {
    let nameToSet = name;
    if (!nameToSet) {
      nameToSet = 'nameless';
    }
    const player = {
      id,
      name: nameToSet,
      points: 20,
    };
    players.push(player);
  },

  // Remove one point from the player
  editPoints(id) {
    totalClicks += 1;
    let pointsWon = 0;
    const player = players.find((playerToFind) => playerToFind.id === id);
    player.points -= 1;
    if (totalClicks % 500 === 0) {
      player.points += 250;
      pointsWon = 250;
    } else if (totalClicks % 100 === 0) {
      player.points += 40;
      pointsWon = 40;
    } else if (totalClicks % 10 === 0) {
      player.points += 5;
      pointsWon = 5;
    }
    return [player.points, pointsWon];
  },

  nextWin() {
    let pointsUntilWin = 0;
    while (pointsUntilWin <= 10) {
      pointsUntilWin += 1;
      if ((totalClicks + pointsUntilWin) % 10 === 0) {
        break;
      }
    }
    return pointsUntilWin;
  },

  getPoints(id) {
    const player = players.find((playerToFind) => playerToFind.id === id);
    return player.points;
  },

  resetPoints(id) {
    const player = players.find((playerToFind) => playerToFind.id === id);
    player.points = 20;
  },

  // Return an array of the top 5 players (or less if the player amount is less than 5)
  getHighscores() {
    players.sort((a, b) => {
      if (a.points <= b.points) {
        return 1;
      }
      return -1;
    });
    const highscoreArray = [];
    let i;
    for (i = 0; i < 5; i += 1) {
      if (i === players.length) {
        break;
      }
      // Do not return the cookies of other players
      const parsedPlayer = {
        name: players[i].name,
        points: players[i].points,
      };
      highscoreArray.push(parsedPlayer);
    }
    return highscoreArray;
  },
};
