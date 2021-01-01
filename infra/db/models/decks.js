import canAdd from '../compositions/canAdd';
import dbModel from '../core/dbModel';

export const STORAGE_KEY = 'ReactNDMobileFlashcards:Decks';

export default dbModel({ storageKey: STORAGE_KEY }, [canAdd()]);
