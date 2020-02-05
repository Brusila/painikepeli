/* eslint-disable no-undef */
import React from 'react';
import PlayButton from '../components/PlayButton';
import PointBalance from '../components/PointBalance';
import StartOverButton from '../components/StartOverButton';
import WinBanner from '../components/WinBanner';
import NextWinBanner from '../components/NextWinBanner';
import Welcome from '../components/Welcome';
import Scoreboard from '../components/Scoreboard';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      clicksToWin: 0,
      pointsWon: 0,
      playerFound: 'false',
      highscores: [{}],
    };
    this.play = this.play.bind(this);
    this.startOver = this.startOver.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch('http://localhost:3001/game/load', {
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

  play() {
    const { counter } = this.state;
    fetch('http://localhost:3001/game/play', {
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

  startOver() {
    const { counter } = this.state;
    fetch('http://localhost:3001/game/startOver', {
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

  handleSubmit(name) {
    this.setState({ playerFound: 'true' });
    fetch('http://localhost:3001/game/start', {
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
    if (playerFound === 'false') {
      main = (
        <main className="main">
          <Welcome handleSubmit={this.handleSubmit} />
        </main>
      );
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

export default Page;
