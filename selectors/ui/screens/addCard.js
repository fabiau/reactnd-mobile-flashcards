export const getAddCardScreenState = (state) =>
  state.ui?.screens?.addCard ?? {
    submitting: false,
    errorMessage: null,
  };
