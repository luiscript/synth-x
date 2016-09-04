import * as types from '../actions/actionTypes';
import Tone from 'tone';

//creating the synth and stored in the initial state of the reducer
const initialState = {

};

export default function play( state = initialState, action = {} ){
  switch (action.type) {
    case types.CREATESYNTH:
      // return {
      //   ...state,
      //   tone: osc
      // }
      return {
        ...state,
        synth: new Tone.PolySynth(6, Tone.Synth, {
      		"oscillator" : {
      			"partials" : [0, 2, 3, 4],
      		}
      	}).toMaster(),
        note: 'C3',
        vel: 100,
      }
    case types.PLAYNOTE:
      state.synth.triggerAttackRelease(action.note, "8n");
      return {
        ...state
      }
    case types.ENVELOPE:
      var envelope = new Tone.AmplitudeEnvelope({
        "attack" : 0.11,
        "decay" : 0.21,
        "sustain" : 0.09,
        "release" : 1.2
      }).toMaster();

      var oscillator = new Tone.Oscillator({
        "partials" : [3, 2, 1],
        "type" : "custom",
        "frequency" : "C#4",
        "volume" : 10,
      }).connect(envelope).start();

      envelope.triggerAttackRelease(action.note, "8n");
      return {
        ...state,
        oscillator: oscillator,
        envelope: envelope
      }
    case types.PARAM:
      action.tone.set(action.param, action.value);
      return{
        ...state
      }
    default:
      return state;
  }
}
