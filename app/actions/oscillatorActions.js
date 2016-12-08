import * as types from './actionTypes';


export function createOscillator(settings) {
  return {
    type: types.CREATESYNTH,
    settings: settings
  };
}

export function playNote(note) {
  return {
    type: types.PLAYNOTE,
    note: note.note
  };
}
