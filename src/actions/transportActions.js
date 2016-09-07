import * as types from './actionTypes';

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

export function schedule(data) {
  console.log("schedule");
  return {
    type: types.TRANSPORTSCHEDULE,
    callback: data.func,
    time: data.time
  };
}

export function bpm(bpmData) {
  return {
    type: types.TRANSPORTBPM,
    bpm: bpmData.bpm,
    ramp: bpmData.ramp
  };
}
