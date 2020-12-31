import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Headline,
  Subheading,
  Title,
  withTheme,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

function DeckDetail({ theme }) {
  return (
    <View style={styles.container}>
      <Headline style={styles.text}>🌟 Astronomy</Headline>
      <Title style={styles.text}>14 cards</Title>

      <Button
        style={styles.button}
        labelStyle={{ color: theme.colors.danger }}
        icon={(props) => <Ionicons name="trash-bin" {...props} />}
      >
        Delete Deck
      </Button>

      <View style={styles.actions}>
        <Button
          style={styles.button}
          mode="contained"
          icon={(props) => <Ionicons name="play" {...props} />}
        >
          Start Quiz
        </Button>

        <Button
          style={styles.button}
          mode="outlined"
          icon={(props) => <Ionicons name="md-add-circle" {...props} />}
        >
          Add Card
        </Button>
      </View>
    </View>
  );
}

export default withTheme(DeckDetail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {},
  text: {
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'column-reverse',
    justifyContent: 'flex-start',
    flexGrow: 1,
    marginTop: 32,
  },
  button: {
    marginTop: 8,
  },
});
