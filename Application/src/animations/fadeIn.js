import React from 'react';
import { Animated, View, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Loading from 'components/Loading';

class FadeInView extends React.Component {
  static propTypes = {
    duration: PropTypes.number.isRequired,
    children: PropTypes.element.isRequired,
    loading: PropTypes.bool.isRequired,
  }
  state = {
    enterX: new Animated.Value(0.1), // Initial value for opacity: 0
    enterY: new Animated.Value(20), // Initial value for opacity: 0
    outerX: new Animated.Value(100), // Initial value for opacity: 0
    outerY: new Animated.Value(100), // Initial value for opacity: 0
    displayLoader: false,
  }

  componentDidMount() {

  }

  render() {
    Animated.timing( // Animate over time
      this.state.enterX, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: this.props.duration + (this.props.duration / 4),
        useNativeDriver: true,

      },
    ).start(); // Starts the animation
    Animated.timing( // Animate over time
      this.state.enterY, // The animated value to drive
      {
        toValue: 100, // Animate to opacity: 1 (opaque)
        duration: this.props.duration - (this.props.duration / 10),
        useNativeDriver: true,
      },
    ).start(); // Starts the animation


    Animated.timing( // Animate over time
      this.state.outerX, // The animated value to drive
      {
        toValue: (30 / Dimensions.get('window').height) * Dimensions.get('window').width, // Animate to
        // opacity: 1 (opaque)
        duration: this.props.duration - (this.props.duration / 4),
        useNativeDriver: true,

      },
    ).start(); // Starts the animation
    Animated.timing( // Animate over time
      this.state.outerY, // The animated value to drive
      {
        toValue: (30 / Dimensions.get('window').width) * Dimensions.get('window').height, // Animate to
        // opacity: 1
        // (opaque)
        duration: this.props.duration + (this.props.duration / 5),
        useNativeDriver: true,
        delay: 0.5,
      },
    ).start(); // Starts the animation

    const animationEnterX = this.state.enterX.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.1, 0.2, 0.9, 1],
    });
    const animationEnterY = this.state.enterY.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.1, 0.2, 0.9, 1],
    });
    const animationOuterX = this.state.outerX.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.1, 0.3, 0.9, 1],
    });
    const animationOuterY = this.state.outerY.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, 0.2, 0.5, 0.9, 1],
    });
    console.log(this.state);

    if (!this.props.loading) {
      return (
        <Animated.View
          style={{
                transform: [
                  {
                    scaleY: animationEnterY,
                  },
                  {
                    scaleX: animationEnterX,
                  },
                ],
              }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
    return (
      <View>
        <Animated.View
          style={{
              transform: [

                {
                  scaleX: animationOuterX,
                },
                {
                  scaleY: animationOuterY,
                },
              ],
            }}
        >
          {this.props.children}
        </Animated.View>
        <View style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
          }}
        >
          <Loading />
        </View>
      </View>
    );
  }
}
export default FadeInView;
