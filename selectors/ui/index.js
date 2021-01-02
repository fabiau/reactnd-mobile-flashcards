export const getErrorByKey = (state, { key }) =>
  state.ui?.errors?.[key] ?? null;

export const getLoaderByKey = (state, { key }) =>
  state.ui?.loaders?.[key] ?? false;

export const getLatestAddedByKey = (state, { key }) =>
  state.ui?.latestsAdded?.[key] ?? null;
