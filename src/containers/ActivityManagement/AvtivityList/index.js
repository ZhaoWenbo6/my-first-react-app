/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:29:47
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:37
 * @Description: 活动列表页
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { changeRouteHistory } from '../../../actions/config';
import FilterCard from './components/FilterCard';
import ListInfo from './components/ListInfo';

class AvtivityList extends Component {
  static displayName = 'AvtivityList';

  componentDidMount() {
    const { history, dispatch } = this.props;
    dispatch(changeRouteHistory(history));
  }

  render() {
    return (
      <Fragment>
        <FilterCard />
        <ListInfo />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(AvtivityList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
