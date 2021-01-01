export const SET_ERROR = 'SET_ERROR';

export function setError({ key, value }) {
  return {
    type: SET_ERROR,
    payload: { key, value },
  };
}
