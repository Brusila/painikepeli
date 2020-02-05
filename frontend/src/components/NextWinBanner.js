import React from 'react';

function NextWinBanner(props) {
  const { points, clicksToWin } = props;
  if (points === 0) {
    return (null);
  }
  return (
    <div className="nextWinDiv">
      <h2 className="nextWinDefinition">Clicks to next win:</h2>
      <h2 className="nextWinPoints">{clicksToWin}</h2>
    </div>
  );
}

export default NextWinBanner;
