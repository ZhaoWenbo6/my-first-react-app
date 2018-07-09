import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { ACTIVITY_LIST, ACTIVITY_DETAILS, CREATE_ACTIVITY } from '../consts/route';
import AvtivityList from '../containers/ActivityManagement/AvtivityList';
import ActivityDetails from '../containers/ActivityManagement/ActivityDetails';
import Create from './create';

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <Route path={ACTIVITY_LIST} component={AvtivityList} />
        <Route path={CREATE_ACTIVITY} component={Create} />
        <Route path={ACTIVITY_DETAILS} component={ActivityDetails} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Activity);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
