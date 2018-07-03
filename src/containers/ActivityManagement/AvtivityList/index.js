import React, { Component } from 'react';
import { connect } from 'react-redux';

class AvtivityList extends Component {
  static displayName = 'AvtivityList';

  render() {
    return <div>AvtivityList</div>;
  }
}

export default connect(mapStateToProps)(AvtivityList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
