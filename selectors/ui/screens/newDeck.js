export const getNewDeckScreenState = (state) =>
  state.ui?.screens?.newDeck ?? {
    submitting: false,
    errorMessage: null,
    lastSubmittedId: null,
  };
