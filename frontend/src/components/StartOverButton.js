import React from 'react';

function StartOverButton(props) {
  const { startOver } = props;
  return (
    <div className="startOverDiv">
      <button type="button" className="startOverButton" onClick={startOver}>START OVER</button>
    </div>
  );
}

export default StartOverButton;
