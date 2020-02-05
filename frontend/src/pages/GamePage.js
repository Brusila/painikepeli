/* eslint-disable no-undef */
import React from 'react';
import PlayButton from '../components/PlayButton';
import PointBalance from '../components/PointBalance';
import StartOverButton from '../components/StartOverButton';
import WinBanner from '../components/WinBanner';
import NextWinBanner from '../components/NextWinBanner';
import Welcome from '../components/Welcome';
import Scoreboard from '../components/Scoreboard';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      clicksToWin: 0,
      pointsWon: 0,
      playerFound: 'false',
      highscores: [],
    };
    this.play = this.play.bind(this);
    this.startOver = this.startOver.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Find out if the player already exists and load the page accordingly
    fetch('/game/load', {
      method: 'GET',
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((res) => this.setState({
        playerFound: res.playerFound,
        points: res.points,
        clicksToWin: res.clicksToWin,
        highscores: res.highscoreArray,
      }));
  }

  // Make the server to remove 1 point from the player
  play() {
    const { counter } = this.state;
    fetch('/game/play', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ totalClicks: counter + 1 }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({
        points: res.points,
        clicksToWin: res.clicksToWin,
        pointsWon: res.pointsWon,
        highscores: res.highscoreArray,
      }));
  }

  // Make the server to reset the player's score to 20
  startOver() {
    const { counter } = this.state;
    fetch('/game/startOver', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ totalClicks: counter + 1 }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({
        points: res.points,
        clicksToWin: res.clicksToWin,
        highscores: res.highscoreArray,
      }));
  }

  // Make server to create a player with the given name
  handleSubmit(name) {
    this.setState({ playerFound: 'true' });
    fetch('/game/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((res) => this.setState({
        points: res.points,
        clicksToWin: res.clicksToWin,
        highscores: res.highscoreArray,
      }));
  }

  render() {
    const {
      points, playerFound, highscores, pointsWon, clicksToWin,
    } = this.state;
    let button;
    if (points === 0) {
      button = <StartOverButton startOver={this.startOver} />;
    } else {
      button = <PlayButton playClicked={this.play} />;
    }

    let main;
    // If the player didn't exist, render the form to enter username
    if (playerFound === 'false') {
      main = (
        <main className="main">
          <Welcome handleSubmit={this.handleSubmit} />
        </main>
      );
    // If the player did exist, render the content for playing the game
    } else {
      main = (
        <main className="main">
          <Scoreboard highscores={highscores} />
          <div className="playDiv">
            <WinBanner pointsWon={pointsWon} />
            {button}
            <NextWinBanner clicksToWin={clicksToWin} points={points} />
          </div>
          <PointBalance points={points} />
        </main>
      );
    }

    return (
      <div className="wrapper">
        <header className="header">
          <h1>Painikepeli</h1>
        </header>
        {main}
        <footer className="footer">
          <p>© Brutukseni</p>
          <a href="https://github.com/Brutukseni/painikepeli" title="Visit my profile on GitHub" target="_blank" rel="noopener noreferrer">GitHub</a>
        </footer>
      </div>
    );
  }
}

export default GamePage;
