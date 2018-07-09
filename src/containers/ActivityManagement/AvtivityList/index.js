/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:29:47
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-06 15:29:47
 * @Description: 活动列表页
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { BASE_INFO } from '../../../consts/route';
import { changeCurrentStep } from '../../../actions/CreateActivity';
import { CURRENT_STEP } from '../../../reducer/ActivityManagement';

class AvtivityList extends Component {
  static displayName = 'AvtivityList';

  gotoFirstPage = () => {
    const { history, dispatch } = this.props;
    dispatch(changeCurrentStep(CURRENT_STEP, 0));
    history.push(BASE_INFO);
  };

  render() {
    return (
      <Button type="primary" onClick={() => this.gotoFirstPage()}>
        新建活动
      </Button>
    );
  }
}

export default connect(mapStateToProps)(AvtivityList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
