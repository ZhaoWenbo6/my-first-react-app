import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetReward extends Component {
  static displayName = 'SetReward';

  render() {
    return <div>SetReward</div>;
  }
}

export default connect(mapStateToProps)(SetReward);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
