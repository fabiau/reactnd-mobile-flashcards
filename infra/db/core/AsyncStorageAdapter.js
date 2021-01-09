import { AsyncStorage } from 'react-native';

function _parseJSONItem(item) {
  try {
    return JSON.parse(item);
  } catch (err) {
    console.error(error);
    return null;
  }
}

/**
 * Adds a new entry to the entries object for the given key.
 * @param {string} storageKey The key where the entries are stored.
 * @param {{ id: string, [prop: string]: any }} entry
 */
export async function addEntry(storageKey, entry) {
  return AsyncStorage.mergeItem(
    storageKey,
    JSON.stringify({
      [entry.id]: entry,
    })
  );
}

/**
 * Removes all entries with the corresponding ids from the storage.
 * @param {string} storageKey The key where the entries are stored.
 * @param {string[]} entriesIds The ids of the entries to be removed.
 */
export async function removeEntries(storageKey, entriesIds) {
  const allEntries = await getAllEntries(storageKey);
  if (allEntries !== null && typeof allEntries === 'object') {
    for (const entryId of entriesIds) {
      allEntries[entryId] = undefined;
      delete allEntries[entryId];
    }
    await AsyncStorage.setItem(storageKey, JSON.stringify(allEntries));
  }
}

/**
 * Patches an entry from the entries object for the given key.
 * @param {string} storageKey The key where the entries are stored.
 */
export async function patchEntry(storageKey, { id, ...props }) {
  const existing = (await getAllEntries(storageKey))?.[id];
  if (existing) {
    return AsyncStorage.mergeItem(
      storageKey,
      JSON.stringify({
        [id]: { ...existing, ...props },
      })
    );
  }
}

/**
 * Returns the stored value for the given key, which should be an object, or null.
 * @param {string} storageKey The key where the entries are stored.
 */
export async function getAllEntries(storageKey) {
  const entry = await AsyncStorage.getItem(storageKey);
  return _parseJSONItem(entry);
}
