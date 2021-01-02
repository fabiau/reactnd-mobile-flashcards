import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default function DismissibleSnackbar({ children, visible, onDismiss }) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: 'Close',
          onPress: onDismiss,
        }}
      >
        {children}
      </Snackbar>
    </View>
  );
}

DismissibleSnackbar.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
});
