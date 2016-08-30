import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import * as synthActions from './actions/synthActions';
import * as patchActions from './actions/patchActions';
import { connect } from 'react-redux';
import './App.css';

var audioParser = require("../audioParser").parser;

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      code: ''
    };
  }
  onTextChange(e){
    this.setState({
      code: e.target.value
    });
  }
  handleClickButton(){
    const { synthActions } = this.props;
    var actions = audioParser.parse(this.state.code);
    if (actions.error) {
      console.log(actions.error);
      return;
    }

    for (var action of actions) {
      synthActions.playNote({note: action.note + action.number});
    }

  }
  handleNewPatch(){
    const { patchActions } = this.props;
    patchActions.newPatch(this.paper);
  }
  render() {
    return (
      <div>
        <textarea onChange={this.onTextChange.bind(this)}>
        </textarea>
        <br />
        <button onClick={this.handleClickButton.bind(this)}>Run</button>
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
