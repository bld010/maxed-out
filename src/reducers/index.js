import { combineReducers } from 'redux';
import { candidate } from './candidate';
import { committee } from './committee';
import { individualContributions } from './individualContributions';
import { pacContributions} from './pacContributions';

export const rootReducer = combineReducers({
  candidate,
  committee_id: committee,
  pacContributions: pacContributions,
  individualContributions: individualContributions
})