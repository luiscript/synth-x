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
  return {
    type: types.TRANSPORTSCHEDULE,
    callback: data.callback,
    startTime: data.startTime
  };
}

export function scheduleRepeat(data) {
  return {
    type: types.TRANSPORTSCHEDULEREPEAT,
    callback: data.callback,
    time: data.time,
    startTime: data.startTime
  };
}

export function scheduleOnce(data) {
  return {
    type: types.TRANSPORTSCHEDULEONCE,
    callback: data.func,
    startTime: data.startTime
  };
}

export function bpm(bpmData) {
  return {
    type: types.TRANSPORTBPM,
    bpm: bpmData.bpm,
    ramp: bpmData.ramp
  };
}
