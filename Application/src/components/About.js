import React, { Component } from 'react';
import { Container, Content, Text, H1, H2, H3 } from 'native-base';
import Slider from 'react-rangeslider';

import Spacer from './Spacer';

class VolumeSlider extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      volume: 0,
    };
  }

  handleOnChange = (value) => {
    this.setState({
      volume: value,
    });
  }

  render() {
    const { volume } = this.state;
    return (
      <Slider
        value={volume}
        orientation="vertical"
        onChange={this.handleOnChange}
      />
    );
  }
}

export default VolumeSlider;
