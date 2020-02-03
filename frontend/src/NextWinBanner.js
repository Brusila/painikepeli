import React from 'react';
import './App.css'

class NextWinBanner extends React.Component {
    render() {
        if (this.props.points === 0) {
            return (null);
        } else {
            return (
                <div>
                    <h2 className='nextWinBanner'>Clicks to next win: {this.props.clicksToWin}</h2>
                </div>
            );
        }
    }
}

export default NextWinBanner;