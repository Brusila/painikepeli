import React from 'react';

function ScoreBoard(props) {
  const { highscores } = props;
  let listitems;
  if (!highscores) {
    listitems = null;
  } else {
    listitems = highscores.map((player) => (
      <li key={player.name.toString()}>
        {player.name}
        {' '}
        -
        {' '}
        {player.points}
        {' '}
        points
      </li>
    ));
  }
  return (
    <div className="highscoreDiv">
      <h2 className="highscoreDefinition">Highscores</h2>
      <ol className="highscoreList">
        {listitems}
      </ol>
    </div>
  );
}

export default ScoreBoard;
