import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as Yup from 'yup';
import { FormTextInput } from '../shared/forms';

const NewDeckSchema = Yup.object().shape({
  question: Yup.string()
    .min(3, 'The question must have at least 3 characters.')
    .max(200, 'The question must have no more than 200 characters.')
    .required('Please inform the question.'),
  answer: Yup.string()
    .min(3, 'The answer must have at least 3 characters.')
    .max(200, 'The answer must have no more than 200 characters.')
    .required('Please inform the answer.'),
});

export default function AddCardForm({ style, onSubmit }) {
  return (
    <Formik
      initialValues={{ question: '', answer: '' }}
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
      }) => (
        <View style={[styles.form, style]}>
          <FormTextInput
            style={styles.field}
            error={touched.question && errors.question}
            inputOptions={{
              maxLength: 200,
              label: 'Question',
              onChangeText: handleChange('question'),
              onBlur: handleBlur('question'),
              value: values.question,
            }}
          />

          <FormTextInput
            style={styles.field}
            error={touched.answer && errors.answer}
            inputOptions={{
              maxLength: 200,
              label: 'Answer',
              onChangeText: handleChange('answer'),
              onBlur: handleBlur('answer'),
              value: values.answer,
            }}
          />

          <Button
            style={styles.actions}
            mode="contained"
            onPress={handleSubmit}
            icon={(props) => <Ionicons name="checkmark-sharp" {...props} />}
          >
            Submit
          </Button>
        </View>
      )}
    </Formik>
  );
}

AddCardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  form: {
    marginTop: 16,
  },
  field: {
    marginTop: 8,
  },
  actions: {
    marginTop: 16,
  },
});
