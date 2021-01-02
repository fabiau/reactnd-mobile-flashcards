import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DismissibleSnackbar from './DismissibleSnackbar';

export default function ErrorSnackbar({ errorMessage, visible, onDismiss }) {
  return (
    <DismissibleSnackbar
      visible={visible ?? !!errorMessage}
      onDismiss={onDismiss}
    >
      {errorMessage}
    </DismissibleSnackbar>
  );
}

ErrorSnackbar.propTypes = {
  errorMessage: PropTypes.string,
  visible: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired,
};
