/**
 * @typedef ModelConfig
 * @type {object}
 * @property {string} storageKey The key where entries are stored.
 */

/**
 * @typedef DbModelCompositionFunction
 * @type {(modelConfig: ModelConfig) => Record<string, any>}
 */

/**
 * @typedef DbModel
 * @type {object}
 * @property {(entry: any) => Promise<AddedEntry> | undefined} add Adds a new entry.
 * @property {(entryId: string) => Promise<void> | undefined} delete Deletes a single entry.
 * @property {() => Promise<Record<string, AddedEntry> | null> | undefined} getAll Gets all entries. Returns null if there are none or it could not be retrieved.
 * @property {(entriesIds: string[]) => Promise<void> | undefined} multiDelete Deletes multiple entries.
 */

/**
 * @typedef AddedEntry
 * @type {object}
 * @property {string} id
 */

/**
 * Returns a composed db model.
 * @param {ModelConfig} modelConfig The config for the model.
 * @param {DbModelCompositionFunction[]} compositions The abilities of this model.
 *
 * @returns {Readonly<DbModel>} Composed db model.
 */
export default function dbModel(modelConfig, compositions) {
  return Object.freeze(
    compositions.reduceRight(
      (model, composition) => ({ ...model, ...composition(modelConfig) }),
      {}
    )
  );
}
