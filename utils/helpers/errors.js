export function formatErrorMessage(error) {
  if (typeof error === 'string') {
    return error;
  }

  if (typeof error === 'object') {
    if (typeof error.message === 'string') {
      return error.message;
    }
  }

  return 'An unexpected error ocurred';
}
