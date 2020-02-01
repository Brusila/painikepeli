const Player = require('../models/player')

function handleCookies(req, res) {
    let cookie = req.cookies.id;
    if (cookie === undefined) {
        cookie = Player.generateId();
        Player.createPlayer(cookie);
        res.cookie('id', cookie, { maxAge: 31556952000});
    };
    if (!Player.playerExists(cookie)) {
        Player.createPlayer(cookie);
    }
    return cookie;
}

module.exports = {
    play(req, res) {
        const id = handleCookies(req, res);
        const pointArray = Player.editPoints(id);
        const remainingCLicks = Player.nextWin();
        res.end(JSON.stringify({points: pointArray[0], clicksToWin: remainingCLicks, pointsWon: pointArray[1]}));
    },

    startOver(req, res) {
        const id = handleCookies(req, res);
        Player.resetPoints(id);
        const playerPoints = Player.getPoints(id);
        const remainingCLicks = Player.nextWin();
        res.end(JSON.stringify({points: playerPoints, clicksToWin: remainingCLicks}));
    },

    intialize(req, res) {
        Player.setup();
        const id = handleCookies(req, res);
        const playerPoints = Player.getPoints(id);
        const remainingCLicks = Player.nextWin();
        res.end(JSON.stringify({points: playerPoints, clicksToWin: remainingCLicks}));
    }
};