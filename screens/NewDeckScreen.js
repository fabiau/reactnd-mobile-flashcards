import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Headline, Paragraph } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import NewDeckForm from '../components/decks/NewDeckForm';

export default function CreateScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Headline>New Deck</Headline>
        <NewDeckForm
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
    marginTop: 12,
  },
});
