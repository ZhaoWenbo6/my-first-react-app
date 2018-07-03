import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { ACTIVITY_TEXT_LIST, NEW_ACTIVITY_TEXT } from '../consts/route';
import ActivityTextList from '../containers/ActivityTips/ActivityTextList';
import NewActivityText from '../containers/ActivityTips/NewActivityText';

class Tips extends Component {
  render() {
    return (
      <Fragment>
        <Route path={ACTIVITY_TEXT_LIST} component={ActivityTextList} />
        <Route path={NEW_ACTIVITY_TEXT} component={NewActivityText} />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(Tips);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
