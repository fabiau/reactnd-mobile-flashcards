import { SET_LOADER } from '../../actions/ui/loaders';

export default function loaders(state = {}, action) {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
}
