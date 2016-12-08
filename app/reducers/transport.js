import * as types from '../actions/actionTypes';
import Tone from 'tone';

const initialState = {
  state: Tone.State,
  bpm: 120,
  swing: 0,
  swingSubdivision: "8n",
  timeSignature: 4,
  loopStart: 0,
  loopEnd: "4m",
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

      console.log("state", state);
      state.transportEvents.push(Tone.Transport.schedule(action.callback, action.startTime));
      state.state = Tone.State;

      return {
        ...state
      }
    case types.TRANSPORTSCHEDULEREPEAT:

      state.transportEvents.push(Tone.Transport.scheduleRepeat(action.callback, action.time, action.startTime));
      state.state = Tone.State;

      return {
        ...state
      }

      case types.TRANSPORTSCHEDULEONCE:

        //This event will be removed after it happens, no need to track event
        Tone.Transport.scheduleOnce(action.callback, action.startTime)

        return {
          ...state
        }
    case types.TRANSPORTBPM:

      Tone.Transport.bpm.rampTo(action.bpm, action.ramp);
      state.bpm = action.bpm;

      return {
        ...state
      }

    default:

      return {
        ...state
      }
  }
}
