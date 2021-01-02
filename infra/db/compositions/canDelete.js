import { removeEntries } from '../core/AsyncStorageAdapter';

export default function canDelete() {
  return function ({ storageKey }) {
    return {
      async delete(entryId) {
        return removeEntries(storageKey, [entryId]);
      },
    };
  };
}
