import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import colors, { ColorSchemeNames } from './colors';
import fonts from './fonts';

function getTheme(colorScheme = ColorSchemeNames.Light) {
  return {
    dark: colorScheme === ColorSchemeNames.Dark,
    roundness: 4,
    animation: {
      scale: 1.04,
    },
    colors: colors[colorScheme],
    fonts: fonts,
  };
}

export default function AppPaperThemeProvider({ children, colorScheme }) {
  return (
    <PaperProvider theme={getTheme(colorScheme)}>{children}</PaperProvider>
  );
}
