import { patchEntry } from '../core/AsyncStorageAdapter';

export default function canPatch() {
  return function ({ storageKey }) {
    return {
      async patch(entryPartial) {
        return patchEntry(storageKey, entryPartial);
      },
    };
  };
}
