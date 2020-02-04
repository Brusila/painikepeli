import React from 'react';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', errorMessage: ''};
        this.submitEvent = this.submitEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value, errorMessage: ''});
    }

    submitEvent(event) {
        if (!this.state.name) {
            this.setState({errorMessage: "Username can't be empty!"})
        } else if (this.state.name.length > 8) {
            this.setState({errorMessage: 'Maximux of 8 characters!'})
        } else {
            this.props.handleSubmit(this.state.name);
        }
        event.preventDefault();
    };

    render() {
        return(
            <div className="welcomeDiv">
                <form className="welcomeForm" onSubmit={this.submitEvent}>
                    <label>Enter your name</label>
                        <input className="welcomeField" type="text" value={this.state.value} onChange={this.handleChange} />
                    <span className="welcomeErrorText">
                        {this.state.errorMessage}
                    </span>
                    <input className="welcomeSubmit" type="submit" value="Let's play!" />
                </form>
            </div>
        );
    }
}

export default Welcome;