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
          Create: {
            screens: {
              CreateScreen: 'create',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
