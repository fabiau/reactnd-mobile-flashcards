import { SET_COLOR_SCHEME } from '../../actions/ui/theme';

export default function theme(state = { colorScheme: null }, action) {
  switch (action.type) {
    case SET_COLOR_SCHEME:
      return {
        ...state,
        colorScheme: action.payload,
      };

    default:
      return state;
  }
}
