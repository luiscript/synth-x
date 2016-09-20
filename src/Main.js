import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import * as synthActions from './actions/synthActions';
import * as patchActions from './actions/patchActions';
import * as transportActions from './actions/transportActions';
import { connect } from 'react-redux';


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
          startTime: action.startTime
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
  handleSlider(e){
    this.setState({
      frequencyValue: e.target.value
    });
    this.props.transportActions.bpm({bpm: e.target.value, ramp: 0});
  }
  render() {
    return (
      <div>
        <textarea onChange={this.onTextChange.bind(this)}>
        </textarea>
        <br />
        <button onClick={this.handleClickButton.bind(this)}>Run code</button>
        <div ref="placeholder"></div>
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
