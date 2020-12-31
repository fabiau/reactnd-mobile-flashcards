import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { INDIGO, PINK } from '../constants/palette';

export const ColorSchemeNames = Object.freeze({
  Light: 'light',
  Dark: 'dark',
});

export default {
  [ColorSchemeNames.Light]: {
    ...DefaultTheme.colors,
    primary: INDIGO[600],
    accent: PINK[500],
  },

  [ColorSchemeNames.Dark]: {
    ...DarkTheme.colors,
    primary: INDIGO[600],
    accent: PINK[500],
  },
};
