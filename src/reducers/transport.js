import * as types from '../actions/actionTypes';

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

      Tone.Transport.start();
      state.state = Tone.State;

      return {
        ...state
      }

    case types.TRANSPORTSTOP:

      Tone.Transport.stop();
      state.state = Tone.State;

      return {
        ...state
      }

    case types.TRANSPORTSCHEDULE:

      const eventId = Tone.Transport.schedule(action.callback);
      state.transportEvents.push(eventId);
      state.state = Tone.State;

      return {
        ...state
      }

    case types.TRANSPORTBPM:

      Tone.Transport.bpm.rampTo(action.bpm, action.ramp);
      state.bpm = action.bpm;

    default:

      return {
        ...state
      }
  }
}
