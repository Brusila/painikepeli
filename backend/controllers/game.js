const Game = require('../models/game');

// Create the player and the cookie (if didn't exist) and return the cookie
function handleCookies(req, res) {
  let cookie = req.cookies.id;
  const { name } = req.body;
  if (cookie === undefined) {
    cookie = Game.generateId();
    Game.createPlayer(cookie, name);
    res.cookie('id', cookie, { maxAge: 31556952000 });
  }
  if (!Game.playerExists(cookie)) {
    Game.createPlayer(cookie, name);
  }
  return cookie;
}

module.exports = {
  // Remove one point from the player
  play(req, res) {
    const id = handleCookies(req, res);
    const pointArray = Game.editPoints(id);
    const remainingCLicks = Game.nextWin();
    const highscores = Game.getHighscores();
    res.end(JSON.stringify({
      points: pointArray[0],
      clicksToWin: remainingCLicks,
      pointsWon: pointArray[1],
      highscoreArray: highscores,
    }));
  },

  // Reset player's points to 20
  startOver(req, res) {
    const id = handleCookies(req, res);
    Game.resetPoints(id);
    const playerPoints = Game.getPoints(id);
    const remainingCLicks = Game.nextWin();
    const highscores = Game.getHighscores();
    res.end(JSON.stringify({
      points: playerPoints,
      clicksToWin: remainingCLicks,
      highscoreArray: highscores,
    }));
  },

  // Create the player (and the cookie) with handlecookies
  start(req, res) {
    const id = handleCookies(req, res);
    const playerPoints = Game.getPoints(id);
    const remainingClicks = Game.nextWin();
    const highscores = Game.getHighscores();
    res.end(JSON.stringify({
      points: playerPoints,
      clicksToWin: remainingClicks,
      highscoreArray: highscores,
    }));
  },

  // Check if the user exists when loading the page
  load(req, res) {
    const cookie = req.cookies.id;
    if (cookie === undefined || !Game.playerExists(cookie)) {
      res.end(JSON.stringify({ playerFound: 'false' }));
    } else {
      const playerPoints = Game.getPoints(cookie);
      const remainingClicks = Game.nextWin();
      const highscores = Game.getHighscores();
      res.end(JSON.stringify({
        playerFound: 'true',
        points: playerPoints,
        clicksToWin: remainingClicks,
        highscoreArray: highscores,
      }));
    }
  },
};
