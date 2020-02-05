import React from 'react';

function WinBanner(props) {
  const { pointsWon } = props;
  if (pointsWon === 0) {
    return (
      <div className="winBannerDiv" />
    );
  }
  return (
    <div className="winBannerDiv">
      <h2 className="winBanner">
        +
        {pointsWon}
        {' '}
        points!
      </h2>
    </div>
  );
}

export default WinBanner;
