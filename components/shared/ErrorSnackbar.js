import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default class ErrorSnackbar extends Component {
  static propTypes = {
    error: PropTypes.string,
    onDismiss: PropTypes.func.isRequired,
  };

  state = {
    visible: false,
  };

  hide = () => {
    this.setState(() => ({
      visible: false,
    }));
    this.props.onDismiss();
  };

  componentDidMount() {
    this.setState(() => ({
      visible: Boolean(this.props.error),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.error !== this.props.error) {
      if (this.props.error && !this.state.visible) {
        this.setState(() => ({
          visible: true,
        }));
      } else if (!this.props.error && this.state.visible) {
        this.setState(() => ({
          visible: false,
        }));
      }
    }
  }

  render() {
    const { error } = this.props;
    const { visible } = this.state;

    return (
      <View style={styles.container}>
        <Snackbar
          visible={visible}
          onDismiss={this.hide}
          action={{
            label: 'Close',
            onPress: this.hide,
          }}
        >
          {error}
        </Snackbar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
