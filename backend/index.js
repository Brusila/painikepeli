const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const GameRouter = require('./routes/game');

const app = express();

const port = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:3000/',
  'Access-Control-Allow-Headers': 'Content-Type',
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/game', GameRouter);

app.listen(port);

module.exports = app;
