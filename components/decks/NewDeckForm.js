import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { FormTextInput } from '../shared/forms';

const NewDeckSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'The deck title must have at least 3 characters.')
    .max(50, 'The deck title must have no more than 50 characters.')
    .required('Please inform a title for the deck.'),
});

export default function NewDeckForm({ style, submitting, onSubmit }) {
  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={NewDeckSchema}
      onSubmit={onSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => {
        const hasTitleError = touched.title && errors.title;

        return (
          <View style={[styles.form, style]}>
            <FormTextInput
              error={hasTitleError}
              inputOptions={{
                maxLength: 50,
                label: 'Title',
                placeholder: 'My Awesome Deck',
                onChangeText: handleChange('title'),
                onBlur: handleBlur('title'),
                value: values.title,
              }}
            />

            <Button
              style={styles.actions}
              loading={submitting}
              disabled={submitting || hasTitleError}
              mode="contained"
              onPress={handleSubmit}
              icon={(props) => <Ionicons name="checkmark-sharp" {...props} />}
            >
              {submitting ? 'Submitting' : 'Submit'}
            </Button>
          </View>
        );
      }}
    </Formik>
  );
}

NewDeckForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  actions: {
    marginTop: 16,
  },
});
