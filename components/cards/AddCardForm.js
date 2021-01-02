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

export default function AddCardForm({ style, submitting, onSubmit }) {
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
      }) => {
        const hasQuestionError = touched.question && errors.question;
        const hasAnswerError = touched.answer && errors.answer;
        const hasError = hasQuestionError || hasAnswerError;

        return (
          <View style={[styles.form, style]}>
            <FormTextInput
              style={styles.field}
              error={hasQuestionError}
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
              error={hasAnswerError}
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
              loading={submitting}
              disabled={submitting || hasError}
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

AddCardForm.propTypes = {
  submitting: PropTypes.bool.isRequired,
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
