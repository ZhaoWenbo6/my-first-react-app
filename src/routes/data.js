import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { VIEW_DATA_BY_ACTIVITY, VIEW_DATA_BY_DAY } from '../consts/route';
import ViewDataByActivity from '../containers/DataBoard/ViewDataByActivity';
import ViewDataByDay from '../containers/DataBoard/ViewDataByDay';

class Data extends Component {
  render() {
    return (
      <Fragment>
        <Route path={VIEW_DATA_BY_ACTIVITY} component={ViewDataByActivity} />
        <Route path={VIEW_DATA_BY_DAY} component={ViewDataByDay} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Data);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
