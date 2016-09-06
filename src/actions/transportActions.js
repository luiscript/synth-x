import * as types from './actionTypes';

export function createSynth(settings) {
  return {
    type: types.TRANSPORTCREATE,
    settings: settings
  };
}

export function start() {
  return {
    type: types.TRANSPORTSTART

  };
}

export function stop() {
  return {
    type: types.TRANSPORTSTOP
  };
}

export function schedule(callback) {
  return {
    type: types.TRANSPORTSCHEDULE,
    callback: callback
  };
}

export function schedule(bpmData) {
  return {
    type: types.TRANSPORTBPM,
    bpm: bpmData.bpm,
    ramp: bpmData.ramp
  };
}
