/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 16:30:17
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-05 18:18:23
 * @Description: 创建活动第一步
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input, Radio } from 'antd';
import _ from 'lodash';
import { Div } from '../../common/Div';
import { changeBaseInfo } from '../../../actions/CreateActivity/baseInfo';
import {
  ACTIVITY_NAME,
  ACTIVITY_TYPE,
  ACTIVITY_END_TIME,
  ACTIVITY_START_TIME,
} from '../../../reducer/ActivityManagement/baseInfo';
import DateRange from '../../common/DateRange';
import { FLEX_BETWEEN_CENTER, FLEX_START_CENTER } from '../../../consts/css';

class BaseInfo extends Component {
  static displayName = 'BaseInfo';
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeName = event => {
    const { value: name } = event.target;
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(ACTIVITY_NAME, name));
  };

  onChangeType = event => {
    const { value: type } = event.target;
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(ACTIVITY_TYPE, type));
  };

  onChangeSource = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  changeStartTime = timeStr => {
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(ACTIVITY_START_TIME, timeStr));
  };

  changeEndTime = timeStr => {
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(ACTIVITY_END_TIME, timeStr));
  };

  render() {
    const RadioGroup = Radio.Group;
    const { activityName, activityType, activitySource } = this.props;
    const nameLimitStyle = `color: red;margin: 0 30px; visibility:${
      activityName.length > nameLengthLimit ? 'visible' : 'hidden'
    }`;
    return (
      <Fragment>
        <Div styleStr={containerStyles}>
          <Div styleStr={itemsStyles}>活动名称：</Div>
          <Input
            style={{ width: '400px' }}
            placeholder="请输入活动名称... 30字以内"
            value={activityName}
            onChange={event => this.onChangeName(event)}
          />
          <Div styleStr={nameLimitStyle}>30字以内</Div>
        </Div>
        <Div styleStr={containerStyles}>
          <Div styleStr={itemsStyles}>活动入口：</Div>
          <RadioGroup onChange={event => this.onChangeType(event)} value={activityType}>
            <Radio value={1}>商详</Radio>
            <Radio value={2}>通天塔</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={containerStyles}>
          <Div styleStr={itemsStyles}>活动时间：</Div>
          <DateRange
            propsStyles={dateRangeStyles}
            changeStartTime={timeStr => this.changeStartTime(timeStr)}
            changeEndtTime={timeStr => this.changeEndTime(timeStr)}
          />
        </Div>
        <Div styleStr={containerStyles}>
          <Div styleStr={itemsStyles}>活动渠道：</Div>
          <RadioGroup onChange={() => this.onChangeSource()} value={activitySource}>
            <Radio value={1}>APP</Radio>
          </RadioGroup>
        </Div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(BaseInfo);

function mapStateToProps(state) {
  return {
    activityName: _.get(state, 'create.baseInfo.activityName', ''),
    activityType: _.get(state, 'create.baseInfo.activityType', 1),
    activityTime: _.get(state, 'create.baseInfo.activityTime', []),
    activitySource: _.get(state, 'create.baseInfo.activitySource', 1),
  };
}

const nameLengthLimit = 30;

const containerStyles = `${FLEX_START_CENTER} margin: 20px 0;`;

const dateRangeStyles = `${FLEX_BETWEEN_CENTER}`;

const itemsStyles = 'margin: 0 10px 0 20px;';
