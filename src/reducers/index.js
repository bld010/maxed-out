import { combineReducers } from 'redux';
import { candidate } from './candidate';
import { committee } from './committee';

export const rootReducer = combineReducers({
  candidate,
  committee_id: committee
})