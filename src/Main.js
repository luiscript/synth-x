import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import * as synthActions from './actions/synthActions';
import * as patchActions from './actions/patchActions';
import * as transportActions from './actions/transportActions';
import { connect } from 'react-redux';
import QwertyHancock from 'qwerty-hancock';


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
    var keyboard = new QwertyHancock({
         id: 'keyboard',
         width: 200,
         height: 150,
         octaves: 1,
         startNote: 'C3',
         whiteNotesColour: 'white',
         blackNotesColour: 'black',
         hoverColour: '#f3e939'
    });
    keyboard.keyDown = function (note, frequency) {
		    synthActions.playNote({note: note});
		};
		keyboard.keyUp = function () {
		    synth.triggerRelease();
		};
  }
  onTextChange(e){
    this.setState({
      code: e.target.value
    });
  }
  handleClickButton(){
    const { synthActions } = this.props;

    //parse the input text stored in this.state
    var actions = parser.parse(this.state.code);

    //catching errors from the parser
    if (actions.error) {
      console.log(actions.error);
      return;
    }

    //iterating the instructions
    for (var action of actions) {
      //dispatching playNote action
      synthActions.playNote({note: action.note + action.number});
    }

  }
  handleNewPatch(){
    const { synthActions } = this.props;
    // patchActions.newPatch(this.paper);
    // if (true) {
    //
    // }
    synthActions.envelope();

  }
  handleSlider(e){
    this.setState({
      frequencyValue: e.target.value
    });
    const { synthActions, state } = this.props;
    // patchActions.newPatch(this.paper);

    console.log("state", state);
    synthActions.param(state.synth.oscillator, 'frequency', e.target.value);
    console.log("frequency", e.target.value);
  }
  render() {
    return (
      <div>
        <textarea onChange={this.onTextChange.bind(this)}>
        </textarea>
        <br />
        <button onClick={this.handleClickButton.bind(this)}>Run</button>
        <button onClick={this.handleNewPatch.bind(this)}>Patch</button>
        <input type="range" ref="frequency" min="0" max="1000" value={this.state.frequencyValue} onChange={this.handleSlider.bind(this)} />
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
  })
)(Main);
