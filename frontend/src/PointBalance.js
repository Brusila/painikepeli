import React from 'react';

class PointBalance extends React.Component {
    render() {
        return (
            <div className='scoreDiv'>
                <h2 className='scoreDefinition'>Score</h2>
                <b className='score'>{this.props.points}</b>
            </div>
        );
    }
}

export default PointBalance;