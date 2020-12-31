import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { GREEN, INDIGO, PINK, RED } from '../constants/palette';

export const ColorSchemeNames = Object.freeze({
  Light: 'light',
  Dark: 'dark',
});

export default {
  [ColorSchemeNames.Light]: {
    ...DefaultTheme.colors,
    primary: INDIGO[600],
    accent: PINK[500],
    danger: RED[600],
    success: GREEN[600],
  },

  [ColorSchemeNames.Dark]: {
    ...DarkTheme.colors,
    primary: INDIGO[600],
    accent: PINK[500],
    danger: RED[500],
    success: GREEN[500],
  },
};
