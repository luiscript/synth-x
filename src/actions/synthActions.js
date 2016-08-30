import * as types from './actionTypes';


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
