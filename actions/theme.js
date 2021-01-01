export const SET_COLOR_SCHEME = 'SET_COLOR_SCHEME';

export function setColorScheme(colorScheme) {
  return {
    type: SET_COLOR_SCHEME,
    payload: colorScheme,
  };
}
