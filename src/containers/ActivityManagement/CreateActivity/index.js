import React, { Component } from 'react';
import { connect } from 'react-redux';

class CreateActivity extends Component {
  static displayName = 'CreateActivity';

  render() {
    return <div>CreateActivity</div>;
  }
}

export default connect(mapStateToProps)(CreateActivity);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
