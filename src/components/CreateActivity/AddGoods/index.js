import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddGoods extends Component {
  static displayName = 'AddGoods';

  render() {
    return <div>AddGoods</div>;
  }
}

export default connect(mapStateToProps)(AddGoods);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
