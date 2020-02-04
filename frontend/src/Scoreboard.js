import React from 'react';

class ScoreBoard extends React.Component {
    render() {
        let listitems;
        if (!this.props.highscores) {
            listitems = null;
        } else {
            listitems = this.props.highscores.map(player => 
                <li key={player.name.toString()}>{player.name} - {player.points} points</li>);
        }
        return (<div className="highscoreDiv">
                    <h2 className="highscoreDefinition">Highscores</h2>
                    <ol className="highscoreList">
                        {listitems}
                    </ol>
                </div>)
    };
}

export default ScoreBoard