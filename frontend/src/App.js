import React from 'react';
import PlayButton from './PlayButton'
import PointBalance from './PointBalance'
import StartOverButton from './StartOverButton'
import WinBanner from './WinBanner'
import NextWinBanner from './NextWinBanner'
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      clicksToWin: 0,
      pointsWon: 0};
    this.play = this.play.bind(this);
    this.startOver = this.startOver.bind(this);

    fetch('http://localhost:3001/game/start', {
              method: 'GET',
              credentials: 'include',
    })
    .then(res => res.json())
    .then(res => this.setState({points: res.points, clicksToWin: res.clicksToWin}))
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
      pointsWon: res.pointsWon
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
      .then(res => this.setState({points: res.points, clicksToWin: res.clicksToWin}))
  }

  render() {
    let button;
    if (this.state.points === 0) {
      button = <StartOverButton startOver = {this.startOver} />;
    } else {
      button = <PlayButton playClicked = {this.play} />;
    }
    return (
      <div className='wrapper'>
        <header className='header'>
          <h1>Painikepeli</h1>
        </header>
        <main className='main'>
          <div className='playDiv'>
            <WinBanner pointsWon = {this.state.pointsWon} />
            {button}
            <NextWinBanner clicksToWin = {this.state.clicksToWin} />
          </div>
          <PointBalance points = {this.state.points} />
        </main>
        <footer className='footer'>
          <p>Made by brutus</p>
        </footer>
      </div>
    );
  }
}

export default App
