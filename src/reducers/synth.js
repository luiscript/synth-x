import * as types from '../actions/actionTypes';
import Tone from 'tone';

const initialState = {
  synth: new Tone.PolySynth(6, Tone.Synth, {
  			"oscillator" : {
  				"partials" : [0, 2, 3, 4],
  			}
  		}).toMaster(),
  note: 'C3',
  vel: 100,
};

export default function play( state = initialState, action = {} ){
  switch (action.type) {
    case types.PLAYNOTE:
      state.synth.triggerAttackRelease(action.note, "8n");
      return {
        ...state
      }
    default:
      return state;
  }
}
