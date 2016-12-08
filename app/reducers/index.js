// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import synth from './synth';
import transport from './transport';

const rootReducer = combineReducers({
  synth,
  transport,
  routing
});

export default rootReducer;
