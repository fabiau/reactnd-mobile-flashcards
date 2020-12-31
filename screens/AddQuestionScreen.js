import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddCardForm from '../components/cards/AddQuestionForm';

export default function AddQuestionScreen({ route }) {
  const deckId = route.params.deckId;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Title>Add to 🌟 Astronomy</Title>
        <AddCardForm
          style={styles.form}
          onSubmit={() => console.log('Submitted!')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    flex: 1,
    marginTop: 32,
  },
});
