export const SET_COLOR_SCHEME = 'ui/theme/SET_COLOR_SCHEME';

export function setColorScheme(colorScheme) {
  return {
    type: SET_COLOR_SCHEME,
    payload: colorScheme,
  };
}
