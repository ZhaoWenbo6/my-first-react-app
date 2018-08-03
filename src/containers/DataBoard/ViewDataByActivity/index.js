import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import FilterCard from './components/FilterCard';

class ViewDataByActivity extends Component {
  static displayName = 'ViewDataByActivity';

  render() {
    return (
      <Fragment>
        <FilterCard />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ViewDataByActivity);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
