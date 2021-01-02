import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import { getColorScheme } from '../selectors/ui/theme';
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

function AppThemeProvider({ children, colorScheme }) {
  return (
    <PaperProvider theme={getTheme(colorScheme)}>{children}</PaperProvider>
  );
}

function mapStateToProps(state) {
  return {
    colorScheme: getColorScheme(state),
  };
}

export default connect(mapStateToProps)(AppThemeProvider);
