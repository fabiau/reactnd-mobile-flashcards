export const SET_LATEST_ADDED = 'SET_LATEST_ADDED';

export function setLatestAdded({ key, value }) {
  return {
    type: SET_LATEST_ADDED,
    payload: { key, value },
  };
}
