import * as types from './actionTypes';

export function newPatch() {
  return {
    type: types.NEWPATCH,
  };
}

export function newPaper(placeholder) {
  return {
    type: types.NEWPAPER,
    placeholder: placeholder
  };
}
