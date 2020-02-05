import React from 'react';

function PointBalance(props) {
  const { points } = props;
  return (
    <div className="scoreDiv">
      <h2 className="scoreDefinition">Score</h2>
      <b className="score">{points}</b>
    </div>
  );
}

export default PointBalance;
