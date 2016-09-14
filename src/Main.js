import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import * as synthActions from './actions/synthActions';
import * as patchActions from './actions/patchActions';
import * as transportActions from './actions/transportActions';
import { connect } from 'react-redux';
//import QwertyHancock from 'qwerty-hancock';


import './App.css';

var parser = require("../parser").parser;

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      code: '',
      frequencyValue: 440,
      noteOn: false,
    };
  }
  componentDidMount() {
    const { patchActions, synthActions } = this.props;
    patchActions.newPaper(this.refs.placeholder);
    synthActions.createSynth();
    // var keyboard = new QwertyHancock({
    //      id: 'keyboard',
    //      width: 200,
    //      height: 150,
    //      octaves: 1,
    //      startNote: 'C3',
    //      whiteNotesColour: 'white',
    //      blackNotesColour: 'black',
    //      hoverColour: '#f3e939'
    // });
    // keyboard.keyDown = function (note, frequency) {
		//     synthActions.playNote({note: note});
		// };
		// keyboard.keyUp = function () {
		//     synthActions.triggerRelease();
		// };
  }
  onTextChange(e){
    this.setState({
      code: e.target.value
    });
  }
  handleClickButton(){
    const { synthActions, transportActions } = this.props;

    //parse the input text stored in this.state
    var actions = parser.parse(this.state.code);

    //catching errors from the parser
    if (actions.error) {
      console.log("error", actions.error);
      return;
    }

    // var sequence = () => {
    //   synthActions.playNote({note: action.instructions[0].note + action.instructions[0].number});
    // }

    //iterating the instructions
    //for (var action of actions) {

    const action = actions[0];

    switch (action.action) {
      case "play":

        synthActions.playNote({note: action.note + action.number});
        break;

      case "sequence":

        transportActions.scheduleRepeat({
          callback: () => {
            synthActions.playNote({note: action.instructions[0].note + action.instructions[0].number});
          },
          time: action.time,
          startTime: action.start
        });

        break;
      case "transport":

        if (action.command === "start") {
            transportActions.start();
        }
        break;
        
      default:
        break;
    }

  }
  handleNewPatch(){
    const { transportActions, synthActions } = this.props;

    const func = () => {
      synthActions.playNote({note: 'C4'});
    };

    const func2 = () => {
      synthActions.playNote({note: 'C5'});
    };

    transportActions.scheduleRepeat({
      callback: func,
      startTime: '0',
      time: '4n'
    });

    transportActions.scheduleRepeat({
      callback: func2,
      startTime: '3n',
      time: '3n'
    });

    transportActions.start();

  }
  handleSlider(e){
    this.setState({
      frequencyValue: e.target.value
    });

    // patchActions.newPatch(this.paper);

    this.props.transportActions.bpm({bpm: e.target.value, ramp: 0});
    //synthActions.param(state.synth.oscillator, 'frequency', e.target.value);
    //console.log("frequency", e.target.value);
  }
  render() {
    return (
      <div>
        <textarea onChange={this.onTextChange.bind(this)}>
        </textarea>
        <br />
        <button onClick={this.handleClickButton.bind(this)}>Run</button>
        <button onClick={this.handleNewPatch.bind(this)}>Patch</button>
        <input type="range" ref="frequency" min="80" max="200" value={this.state.frequencyValue} onChange={this.handleSlider.bind(this)} />
        <div id="keyboard"></div>
        <div ref="placeholder" ></div>
      </div>
    );
  }
}

export default connect(state => ({
    state: state
  }),
  (dispatch) => ({
    patchActions: bindActionCreators(patchActions, dispatch),
    synthActions: bindActionCreators(synthActions, dispatch),
    transportActions: bindActionCreators(transportActions, dispatch)
  })
)(Main);
