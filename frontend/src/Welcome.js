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
            this.setState({errorMessage: 'No empty names!'})
        } else if (this.state.name.length > 8) {
            this.setState({errorMessage: 'Maximux of 8 characters!'})
        } else {
            this.props.handleSubmit(this.state.name);
        }
        event.preventDefault();
    };

    render() {
        return(
            <div>
                <span>
                    {this.state.errorMessage}
                </span>
                <form onSubmit={this.submitEvent}>
                    <label>
                        Name:
                        <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Welcome;