import * as types from '../actions/actionTypes';
import Tone from 'tone';

const initialState = {
  state: Tone.State,
    bpm: 120
    swing: 0
    swingSubdivision: "8n"
    timeSignature: 4
    loopStart: 0
    loopEnd: "4m"
    PPQ: 192,
    transportEvents: []
};

export default function transport( state = initialState, action = {} ){
  switch (action.type) {
    case types.TRANSPORTCREATE:

      return {
        ...state
      }

    case types.TRANSPORTSTART:
      return {
        ...state
      }

    case types.TRANSPORTSTOP:
      return {
        ...state
      }

    case types.TRANSPORTSCHEDULE:
      return {
        ...state
      }

    default:
      return {
        ...state
      }
  }
}
