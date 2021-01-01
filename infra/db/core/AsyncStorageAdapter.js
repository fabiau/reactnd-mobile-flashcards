import { AsyncStorage } from 'react-native';

function _parseJSONItem(item) {
  try {
    return JSON.parse(item);
  } catch (err) {
    console.error(error);
    return null;
  }
}

export async function addEntry(storageKey, entry) {
  return AsyncStorage.mergeItem(
    storageKey,
    JSON.stringify({
      [entry.id]: entry,
    })
  );
}

export async function getAllEntries(storageKey) {
  const entry = await AsyncStorage.getItem(storageKey);
  return _parseJSONItem(entry);
}
