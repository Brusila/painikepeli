import React from 'react';

function PlayButton(props) {
  const { playClicked } = props;
  return (
    <button type="button" className="playButton" onClick={playClicked}>PLAY</button>
  );
}

export default PlayButton;
