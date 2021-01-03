import { addEntry } from '../core/AsyncStorageAdapter';

export function _uuid() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export default function canAdd({ autoGenerateId = true } = {}) {
  return function ({ storageKey }) {
    return {
      async add(entry) {
        const newEntry = autoGenerateId
          ? { ...entry, id: _uuid() }
          : { ...entry };
        await addEntry(storageKey, newEntry);
        return newEntry;
      },
    };
  };
}
