import { Component } from 'react';

class Measure extends Component {
  state = { set: false, rect: {} };

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    setTimeout(this.updateDimensions, 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps() {
    this.updateDimensions();
  }

  updateDimensions = () => {
    if (this.props.measureRef.current) {
      this.setState({
        set: true,
        rect: this.props.measureRef.current.getBoundingClientRect(),
      });
    }
  };

  render() {
    return this.props.render(this.state);
  }
}

export default Measure;
