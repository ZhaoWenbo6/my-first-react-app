import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { BASE_INFO, ADD_GOODS, SET_REWARDS, ACTIVITY_PREVIEW } from '../consts/route';
import CreateActivity from '../containers/ActivityManagement/CreateActivity';
import BaseInfo from '../components/CreateActivity/BaseInfo';
import AddGoods from '../components/CreateActivity/AddGoods';
import SetReward from '../components/CreateActivity/SetReward';
import ActivityPreview from '../components/CreateActivity/ActivityPreview';

class Create extends Component {
  static displayName = 'Create';

  render() {
    return (
      <CreateActivity>
        <Route path={BASE_INFO} component={BaseInfo} />
        <Route path={ADD_GOODS} component={AddGoods} />
        <Route path={SET_REWARDS} component={SetReward} />
        <Route path={ACTIVITY_PREVIEW} component={ActivityPreview} />
      </CreateActivity>
    );
  }
}

export default connect(mapStateToProps)(Create);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
