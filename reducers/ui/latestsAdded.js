import { SET_LATEST_ADDED } from '../../actions/ui/latestsAdded';

export default function latestsAdded(state = {}, action) {
  switch (action.type) {
    case SET_LATEST_ADDED:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
}
