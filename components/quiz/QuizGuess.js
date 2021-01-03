import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Subheading, withTheme } from 'react-native-paper';
import { Animated, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class QuizGuess extends Component {
  state = {
    animation: {
      fade: new Animated.Value(0),
    },
  };

  show = () => {
    Animated.timing(this.state.animation.fade, {
      toValue: 1,
      duration: 400,
      isInteraction: true,
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    Animated.timing(this.state.animation.fade, {
      toValue: 0,
      duration: 400,
      isInteraction: true,
      useNativeDriver: true,
    }).start();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.visible && !this.props.visible) {
      this.hide();
    } else if (!prevProps.visible && this.props.visible) {
      this.show();
    }
  }

  render() {
    const { theme, visible } = this.props;
    const { animation } = this.state;

    return (
      <Animated.View style={[styles.container, { opacity: animation.fade }]}>
        <Subheading>My guess was:</Subheading>
        <View style={styles.actions}>
          <Button
            mode="outlined"
            color={theme.colors.success}
            style={[
              styles.button,
              { borderTopRightRadius: 0, borderBottomRightRadius: 0 },
            ]}
            icon={(props) => <Ionicons name="checkmark" {...props} />}
          >
            Correct
          </Button>
          <Button
            mode="outlined"
            color={theme.colors.danger}
            style={[
              styles.button,
              { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
            ]}
            icon={(props) => <Ionicons name="close" {...props} />}
          >
            Incorrect
          </Button>
        </View>
      </Animated.View>
    );
  }
}

QuizGuess.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default withTheme(QuizGuess);

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  actions: {
    marginTop: 8,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
  },
});
