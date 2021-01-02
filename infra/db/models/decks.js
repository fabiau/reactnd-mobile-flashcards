import canAdd from '../compositions/canAdd';
import canDelete from '../compositions/canDelete';
import canPatch from '../compositions/canPatch';
import canGetAll from '../compositions/canGetAll';
import dbModel from '../core/dbModel';

export const STORAGE_KEY = 'ReactNDMobileFlashcards:Decks';

export default dbModel({ storageKey: STORAGE_KEY }, [
  canAdd(),
  canDelete(),
  canPatch(),
  canGetAll(),
]);
