const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const GameRouter = require('./routes/game');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../frontend/build')))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/game', GameRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
});

app.listen(port);

module.exports = app;
