import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityTextList extends Component {
  static displayName = 'ActivityTextList';

  render() {
    return <div>ActivityTextList</div>;
  }
}

export default connect(mapStateToProps)(ActivityTextList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
