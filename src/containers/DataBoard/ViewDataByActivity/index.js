import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewDataByActivity extends Component {
  static displayName = 'ViewDataByActivity';

  render() {
    return <div>ViewDataByActivity</div>;
  }
}

export default connect(mapStateToProps)(ViewDataByActivity);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
