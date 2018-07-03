/*
 * @Author: Wenbo Zhao
 * @Date: 2018-06-27 15:31:46
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-06-27 17:04:22
 * @Description: App路由管理组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @youWant: 
 */
import React, { Component } from 'react';
import { Route } from 'react-router';
import App from '../containers/App';
import Loading from './loading';
import { connect } from 'react-redux';
import {
  DEFAULT_ROUTE,
  ACTIVITY_MANAGEMENT,
  DATA_BOARD,
  ACTIVITY_TEXT_MANAGEMENT,
} from '../consts/route';
import AvtivityList from '../containers/ActivityManagement/AvtivityList';
import Activity from './activity';
import Data from './data';
import Tips from './tips';

class AppRouter extends Component {
  render() {
    if (this.props.isAppReady) {
      return (
        <App>
          <Route exact path={DEFAULT_ROUTE} component={AvtivityList} />
          <Route path={ACTIVITY_MANAGEMENT} component={Activity} />
          <Route path={DATA_BOARD} component={Data} />
          <Route path={ACTIVITY_TEXT_MANAGEMENT} component={Tips} />
        </App>
      );
    }
    return <Loading />;
  }
}

export default connect(mapStateToProps)(AppRouter);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
