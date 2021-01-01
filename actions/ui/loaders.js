export const SET_LOADER = 'SET_LOADER';

export function setLoader({ key, value }) {
  return {
    type: SET_LOADER,
    payload: { key, value },
  };
}
