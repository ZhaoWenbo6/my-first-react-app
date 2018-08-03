/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 16:30:17
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 16:43:31
 * @Description: 创建活动第一步
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
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
  END_TIME,
  START_TIME,
} from '../../../reducer/ActivityManagement/baseInfo';
// import DateRange from '../../common/DateRange';
import { FLEX_START_CENTER } from '../../../consts/css';
import { changeAddGoods, resetAddGoods } from '../../../actions/CreateActivity/addGoods';
import { MATCH_TYPE } from '../../../reducer/ActivityManagement/addGoods';
import DateRanges from '../../common/DateRanges';
import { resetRewardInfo } from '../../../actions/CreateActivity/rewardInfo';

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
    const matchType = type === 3 ? 4 : 1;
    dispatch(changeBaseInfo(ACTIVITY_TYPE, type));
    switch (matchType) {
      case 1:
        dispatch(resetAddGoods());
        break;
      case 4:
        dispatch(resetAddGoods());
        break;
      default:
        break;
    }
    dispatch(changeAddGoods(MATCH_TYPE, matchType));
    dispatch(resetRewardInfo());
  };

  onChangeSource = e => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  };

  changeStartTime = timeStr => {
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(START_TIME, timeStr));
  };

  changeEndTime = timeStr => {
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(END_TIME, timeStr));
  };

  changeTime = timeArr => {
    const { dispatch } = this.props;
    dispatch(changeBaseInfo(START_TIME, timeArr[0]));
    dispatch(changeBaseInfo(END_TIME, timeArr[1]));
  };

  render() {
    const RadioGroup = Radio.Group;
    const { activityName, activityType, activitySource, startTime, endTime } = this.props;
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
            <Radio value={3}>通天塔</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={containerStyles}>
          <Div styleStr={itemsStyles}>活动时间：</Div>
          <DateRanges onChange={timeArr => this.changeTime(timeArr)} value={[startTime, endTime]} />
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
    startTime: _.get(state, 'create.baseInfo.startTime', 0),
    endTime: _.get(state, 'create.baseInfo.endTime', 0),
    activitySource: _.get(state, 'create.baseInfo.activitySource', 1),
  };
}

const nameLengthLimit = 30;

const containerStyles = `${FLEX_START_CENTER} margin: 20px 0;`;

// const dateRangeStyles = `${FLEX_BETWEEN_CENTER}`;

const itemsStyles = 'margin: 0 10px 0 20px;';
