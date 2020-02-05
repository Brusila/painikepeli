import React from 'react';

class WinBanner extends React.Component {
    render() {
        if (this.props.pointsWon === 0) {
            return(
                <div className='winBannerDiv'></div>
            );
        } else {
            return (
                <div className='winBannerDiv'>
                    <h2 className='winBanner'>+ {this.props.pointsWon} points!</h2>
                </div>
            );
        }
    }
}

export default WinBanner;