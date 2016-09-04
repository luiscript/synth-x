import * as types from './actionTypes';


export function createSynth() {
  return {
    type: types.CREATESYNTH,
  };
}

export function playNote(note) {
  return {
    type: types.PLAYNOTE,
    note: note.note
  };
}

export function playNumber() {
  return {
    type: types.PLAYNUMBER
  };
}

export function triggerAttack(){
  return {
    type: types.TRIGGERATTACK
  }
}

export function triggerRelease(){
  return {
    type: types.TRIGGERRELEASE
  }
}

export function triggerAttackRelease(){
  return {
    type: types.TRIGGERATTACKRELEASE
  }
}

export function envelope(freq) {
  return {
    type: types.ENVELOPE,
    frequency: freq
  };
}

export function param(tone, param, value){
  return {
    type: types.PARAM,
    tone: tone,
    param: param,
    value: value
  }
}
