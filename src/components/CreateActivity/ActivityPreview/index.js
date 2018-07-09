import React, { Component } from 'react';
import { connect } from 'react-redux';

class ActivityPreview extends Component {
  static displayName = 'ActivityPreview';

  render() {
    return <div>ActivityPreview</div>;
  }
}

export default connect(mapStateToProps)(ActivityPreview);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
