import { getAllEntries } from '../core/AsyncStorageAdapter';

export default function canGetAll() {
  return function ({ storageKey }) {
    return {
      async getAll(entry) {
        return getAllEntries(storageKey);
      },
    };
  };
}
