import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { CREATE_ACTIVITY, ACTIVITY_LIST, ACTIVITY_DETAILS } from '../consts/route';
import CreateActivity from '../containers/ActivityManagement/CreateActivity';
import AvtivityList from '../containers/ActivityManagement/AvtivityList';
import ActivityDetails from '../containers/ActivityManagement/ActivityDetails';

class Activity extends Component {
  render() {
    return (
      <Fragment>
        <Route path={ACTIVITY_LIST} component={AvtivityList} />
        <Route path={CREATE_ACTIVITY} component={CreateActivity} />
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
