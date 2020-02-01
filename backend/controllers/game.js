const Player = require('../models/player')

function handleCookies(req, res) {
    let cookie = req.cookies.id;
    const name = req.body.name;
    if (cookie === undefined) {
        cookie = Player.generateId();
        Player.createPlayer(cookie, name);
        res.cookie('id', cookie, { maxAge: 31556952000});
    };
    if (!Player.playerExists(cookie)) {
        Player.createPlayer(cookie, name);
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

    start(req, res) {
        const id = handleCookies(req, res);
        const playerPoints = Player.getPoints(id);
        const remainingClicks = Player.nextWin();
        res.end(JSON.stringify({points: playerPoints, clicksToWin: remainingClicks}));
    },

    load(req, res) {
        Player.setup();
        let cookie = req.cookies.id;
        if (cookie === undefined || !Player.playerExists(cookie)) {
            res.end(JSON.stringify({playerFound: 'false'}))
        } else {
            const playerPoints = Player.getPoints(cookie);
            const remainingClicks = Player.nextWin();
            res.end(JSON.stringify({playerFound: 'true', points: playerPoints, clicksToWin: remainingClicks}));
        }
    }
};