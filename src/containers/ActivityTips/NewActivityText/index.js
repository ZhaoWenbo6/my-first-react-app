import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewActivityText extends Component {
  static displayName = 'NewActivityText';

  render() {
    return <div>NewActivityText</div>;
  }
}

export default connect(mapStateToProps)(NewActivityText);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
