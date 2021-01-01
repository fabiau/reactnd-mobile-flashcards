import { SET_ERROR } from '../../actions/ui/errors';

export default function errors(state = {}, action) {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    default:
      return state;
  }
}
