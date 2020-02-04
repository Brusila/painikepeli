import React from 'react';
import './App.css'

class NextWinBanner extends React.Component {
    render() {
        if (this.props.points === 0) {
            return (null);
        } else {
            return (
                <div className="nextWinDiv">
                    <h2 className='nextWinDefinition'>Clicks to next win:</h2>
                    <h2 className="nextWinPoints">{this.props.clicksToWin}</h2>
                </div>
            );
        }
    }
}

export default NextWinBanner;