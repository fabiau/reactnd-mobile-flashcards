import canAdd from '../compositions/canAdd';
import canGetAll from '../compositions/canGetAll';
import canMultiDelete from '../compositions/canMultiDelete';
import dbModel from '../core/dbModel';

export const STORAGE_KEY = 'ReactNDMobileFlashcards:Guesses';

export default dbModel({ storageKey: STORAGE_KEY }, [
  canAdd({ autoGenerateId: false }),
  canMultiDelete(),
  canGetAll(),
]);
