import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setError } from '../../actions/ui/errors';
import { getErrorByKey } from '../../selectors/ui';
import ErrorSnackbar from './ErrorSnackbar';

export default function createErrorSnackbarContainer(uiStateKey) {
  function mapStateToProps(state) {
    return {
      error: getErrorByKey(state, { key: uiStateKey }),
    };
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setError }, dispatch);
  }

  class ErrorSnackbarWrapper extends Component {
    handleDismiss = () => {
      this.props.setError({ key: uiStateKey, value: null });
    };

    render() {
      return (
        <ErrorSnackbar
          error={this.props.error}
          onDismiss={this.handleDismiss}
        />
      );
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(ErrorSnackbarWrapper);
}
