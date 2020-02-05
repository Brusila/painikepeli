import React from 'react';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', errorMessage: '' };
    this.submitEvent = this.submitEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value, errorMessage: '' });
  }

  submitEvent(event) {
    const { name } = this.state;
    const { handleSubmit } = this.props;
    if (!name) {
      this.setState({ errorMessage: "Username can't be empty!" });
    } else if (name.length > 8) {
      this.setState({ errorMessage: 'Maximux of 8 characters!' });
    } else {
      handleSubmit(name);
    }
    event.preventDefault();
  }

  render() {
    const { value, errorMessage } = this.state;
    return (
      <div className="welcomeDiv">
        <form className="welcomeForm" onSubmit={this.submitEvent}>
          <span>Enter your name</span>
          <input className="welcomeField" type="text" value={value} onChange={this.handleChange} />
          <span className="welcomeErrorText">
            {errorMessage}
          </span>
          <input className="welcomeSubmit" type="submit" value="Let's play!" />
        </form>
      </div>
    );
  }
}

export default Welcome;
