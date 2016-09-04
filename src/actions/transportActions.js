import * as types from './actionTypes';

export function createSynth(settings) {
  return {
    type: types.TRANSPORTCREATE,
    settings: settings
  };
}

export function start() {
  return {
    type: types.TRANSPORTCREATE

  };
}

export function stop() {
  return {
    type: types.TRANSPORTCREATE
  };
}

export function stop() {
  return {
    type: types.TRANSPORTSCHEDULE
  };
}
