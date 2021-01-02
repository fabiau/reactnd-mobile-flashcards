import { removeEntries } from '../core/AsyncStorageAdapter';

export default function canMultiDelete() {
  return function ({ storageKey }) {
    return {
      async multiDelete(entriesIds) {
        return removeEntries(storageKey, entriesIds);
      },
    };
  };
}
