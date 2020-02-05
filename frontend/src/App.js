import React from 'react';
import PlayButton from './PlayButton'
import PointBalance from './PointBalance'
import StartOverButton from './StartOverButton'
import WinBanner from './WinBanner'
import NextWinBanner from './NextWinBanner'
import Welcome from './Welcome'
import Scoreboard from './Scoreboard'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      clicksToWin: 0,
      pointsWon: 0,
      name: '',
      playerFound: 'false',
      highscores: [{}]};
    this.play = this.play.bind(this);
    this.startOver = this.startOver.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    fetch('http://localhost:3001/game/load', {
      method: 'GET',
      credentials: 'include',
    })
    .then(res => res.json())
    .then(res => this.setState({playerFound: res.playerFound, points: res.points, clicksToWin: res.clicksToWin, highscores: res.highscoreArray}))
  }

  play() {
    fetch('http://localhost:3001/game/play', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      credentials: 'include',
      body: JSON.stringify({totalClicks: this.state.counter + 1})
    })
    .then(res => res.json())
    .then(res => this.setState({
      points: res.points,
      clicksToWin: res.clicksToWin,
      pointsWon: res.pointsWon,
      highscores: res.highscoreArray
    }))
  }

  startOver() {
    fetch('http://localhost:3001/game/startOver', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json', 
      },
      credentials: 'include',
      body: JSON.stringify({totalClicks: this.state.counter + 1})
    })
    .then(res => res.json())
    .then(res => this.setState({points: res.points, clicksToWin: res.clicksToWin, highscores: res.highscoreArray}))
  }

  handleSubmit(name) {
    this.setState({playerFound: 'true', name: name});
    fetch('http://localhost:3001/game/start', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      credentials: 'include',
      body: JSON.stringify({name: name})
    })
    .then(res => res.json())
    .then(res => this.setState({points: res.points, clicksToWin: res.clicksToWin, highscores: res.highscoreArray}))
  }

  render() {
    let button;
    if (this.state.points === 0) {
      button = <StartOverButton startOver = {this.startOver} />;
    } else {
      button = <PlayButton playClicked = {this.play} />;
    }

    let main;
    if (this.state.playerFound === 'false') {
      main = (
        <main className='main'>
          <Welcome handleSubmit = {this.handleSubmit} />
        </main>
      );
    } else {
      main = (
        <main className='main'>
          <Scoreboard highscores = {this.state.highscores}/>
          <div className='playDiv'>
            <WinBanner pointsWon = {this.state.pointsWon} />
            {button}
            <NextWinBanner clicksToWin = {this.state.clicksToWin} points = {this.state.points} />
          </div>
          <PointBalance points = {this.state.points} />
        </main>
      );
    }
    
    return (
      <div className='wrapper'>
        <header className='header'>
          <h1>Painikepeli</h1>
        </header>
        {main}
        <footer className='footer'>
          <p>© Brutukseni</p>
          <a href="https://github.com/Brutukseni/painikepeli" title="Visit my profile on GitHub" target="_blank">GitHub</a>
        </footer>
      </div>
    );
  }
}

export default App
