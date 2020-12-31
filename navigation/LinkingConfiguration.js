import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Decks: {
            screens: {
              DecksScreen: 'decks',
            },
          },
          DeckDetail: {
            screens: {
              DeckDetail: 'deck-detail',
            },
          },
          NewDeck: {
            screens: {
              NewDeckScreen: 'new-deck',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
