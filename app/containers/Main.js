// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main';
import * as synthActions from '../actions/synthActions';

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(synthActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
