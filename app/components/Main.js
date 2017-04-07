import React, { Component } from 'react';
//import InstructionList from './components/InstructionList';
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

    const { playNote, createSynth } = this.props;

    createSynth();
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nexState", nextState);
    //var instructions = parser.parse(nextState.code);

    // if (instructions.error != null) {
    //   console.log("error");
    //   return false;
    // }else{
    //   console.log("good");
    //   return true;
    // }

    return true;
  }
  onTextChange(e){
    // this.setState({
    //   code: e.target.value
    // });
  }
  handleClickButton(){
    const {  playNote } = this.props;



    //parse the input text stored in this.state
    var actions = parser.parse(this.refs.textAreaCode.value);

    //catching errors from the parser
    if (actions.error) {
      console.log("error", actions.error);
      return;
    }

    const action = actions[0];

    switch (action.action) {
      case "play":

        playNote({note: action.note + action.number});
        break;

      case "sequence":
        transportActions.scheduleRepeat({
          callback: () => {
            playNote({note: action.instructions[0].note + action.instructions[0].number});
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

    this.setState({
      code: actions
    });
  }
  handleSlider(e){
    this.setState({
      frequencyValue: e.target.value
    });
    this.props.transportActions.bpm({bpm: e.target.value, ramp: 0});
  }
  render() {
    let instructions = this.state.code;

    return (
      <div>
        <textarea ref="textAreaCode" onChange={this.onTextChange.bind(this)}>
        </textarea>
        <br />
        <button onClick={this.handleClickButton.bind(this)}>Run code</button>
        <div ref="placeholder"></div>
        <br />
      </div>
    );
  }
}

export default Main
