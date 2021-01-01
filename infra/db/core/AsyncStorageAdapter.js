import { AsyncStorage } from 'react-native';

export async function addEntry(storageKey, entry) {
  return AsyncStorage.mergeItem(
    storageKey,
    JSON.stringify({
      [entry.id]: entry,
    })
  );
}
