import React from 'react';
import './App.css'

class TheButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent() {
        this.props.playClicked();
    };

    render() {
        return (
            <button className='playButton' onClick={this.clickEvent}>Play</button>
        );
    }
}

export default TheButton