import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, StyleSheet, View } from 'react-native';

export default class SwitchTransition extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    transitionKey: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      animation: {
        scale: new Animated.Value(1),
        opacity: new Animated.Value(1),
      },
      activeNode: props.children,
    };
  }

  transitFrom = (nextNode) => {
    Animated.parallel(
      [
        Animated.timing(this.state.animation.scale, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          isInteraction: true,
        }),
        Animated.timing(this.state.animation.opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
          isInteraction: true,
        }),
      ],
      { stopTogether: true }
    ).start(({ finished }) => {
      if (finished) {
        this.setState(() => ({
          activeNode: nextNode,
        }));
      }
    });
  };

  transitTo = (activeNode) => {
    Animated.parallel(
      [
        Animated.spring(this.state.animation.scale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
          isInteraction: true,
        }),
        Animated.timing(this.state.animation.opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
          isInteraction: true,
        }),
      ],
      { stopTogether: true }
    ).start();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.children !== this.props.children) {
      if (prevProps.transitionKey !== this.props.transitionKey) {
        this.transitFrom(this.props.children);
      } else {
        this.setState(() => ({
          activeNode: this.props.children,
        }));
      }
    } else if (prevState.activeNode !== this.state.activeNode) {
      this.transitTo(this.state.activeNode);
    }
  }

  render() {
    const { activeNode, animation } = this.state;

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ scale: animation.scale }],
            opacity: animation.opacity,
          },
        ]}
      >
        {activeNode}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
