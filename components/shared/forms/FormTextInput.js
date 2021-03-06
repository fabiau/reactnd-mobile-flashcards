import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

export default function FormTextInput({ error, inputOptions, style }) {
  const hasError = Boolean(error);

  return (
    <View style={style}>
      <TextInput error={hasError} {...inputOptions} mode="flat" />
      <HelperText visible={hasError} type="error" padding="none">
        {error}
      </HelperText>
    </View>
  );
}

FormTextInput.propTypes = {
  error: PropTypes.string,
  inputOptions: PropTypes.shape({
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    label: PropTypes.string,
    maxLength: PropTypes.number,
    // ...Rest of TextInput props
  }).isRequired,
};
