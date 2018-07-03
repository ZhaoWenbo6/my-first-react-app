import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityDetails extends Component {
  static displayName = 'ActivityDetails';

  render() {
    return <div>ActivityDetails</div>;
  }
}

export default connect(mapStateToProps)(ActivityDetails);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
