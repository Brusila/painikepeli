import React from 'react';

class PlayButton extends React.Component {
    constructor(props) {
        super(props);
        this.clickEvent = this.clickEvent.bind(this);
    }

    clickEvent(event) {
        console.log(event);
        
        if (event.which !== 13 && event.which !== 32) {
            this.props.playClicked();
        }
    };

    render() {
        return (
            <button className='playButton' onClick={(e) => {
                this.clickEvent(e)}}>PLAY</button>
        );
    }
}

export default PlayButton;