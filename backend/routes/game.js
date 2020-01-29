const express = require("express");
const router = express.Router();
const PlayController = require('../controllers/game')

router.post('/play', PlayController.play);
router.post('/startOver', PlayController.startOver);
router.get('/start', PlayController.intialize);

module.exports = router;