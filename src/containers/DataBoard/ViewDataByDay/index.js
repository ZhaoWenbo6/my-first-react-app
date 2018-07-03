import React, { Component } from 'react';
import { connect } from 'react-redux';

class ViewDataByDay extends Component {
  static displayName = 'ViewDataByDay';

  render() {
    return <div>ViewDataByDay</div>;
  }
}

export default connect(mapStateToProps)(ViewDataByDay);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
