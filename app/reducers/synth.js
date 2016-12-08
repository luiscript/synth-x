import * as types from '../actions/actionTypes';
import Tone from 'tone';

const initialState = {
  synthList: [],
  synth: null
};

export default function play( state = initialState, action = {} ){
  switch (action.type) {
    case types.CREATESYNTH:
      var synth = new Tone.PolySynth(6, Tone.Synth, {
        "oscillator" : {
          "partials" : [0, 2, 3, 4],
        }
      }).toMaster();

      return {
        ...state,
        synth: synth,
      }
    case types.PLAYNOTE:
      state.synth.triggerAttackRelease(action.note, "8n");
      return {
        ...state
      }
    case types.TRIGGERATTACK:
      action.tone.triggerAttack(action.note);
      return {

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
