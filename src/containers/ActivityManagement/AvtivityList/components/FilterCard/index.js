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
import { Card, Row, Col, Input, Select, DatePicker, Button, InputNumber } from 'antd';
import { Div } from '../../../../../components/common/Div';
import { FLEX_SPACEAROUND_CENTER } from '../../../../../consts/css';
import _ from 'lodash';
import {
  ACTIVITY_NAME,
  ACTIVITY_ID,
  ACTIVITY_TYPE,
  ACTIVITY_STATE,
  ACTIVITY_CREATER,
  ACTIVITY_END_TIME,
  ACTIVITY_START_TIME,
} from '../../../../../reducer/ActivityList';
import {
  changeActivityListValue,
  requestActivityListInfo,
  resetQueryFilter,
} from '../../../../../actions/ActivityList';
import moment from 'moment';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class FilterCard extends Component {
  static displayName = 'FilterCard';

  handleChange = () => {};

  onChange = (value, dateString) => {
    const { dispatch } = this.props;
    dispatch(
      changeActivityListValue(ACTIVITY_START_TIME, value.length ? moment(value[0]).valueOf() : 0)
    );
    dispatch(
      changeActivityListValue(ACTIVITY_END_TIME, value.length ? moment(value[1]).valueOf() : 0)
    );
    console.log(dateString);
  };

  onOk = value => {
    console.log('onOk: ', value);
  };

  onChangeValue = (value, type) => {
    const { dispatch } = this.props;
    dispatch(changeActivityListValue(type, value));
  };

  queryActivityList = () => {
    const { dispatch } = this.props;
    dispatch(requestActivityListInfo(1, 10));
  };

  resetQueryFilter = () => {
    const { dispatch } = this.props;
    dispatch(resetQueryFilter());
  };

  renderFilter = () => {
    const {
      activityName,
      activityId,
      activityType,
      activityState,
      activityStartTime,
      activityEndTime,
      activityCreater,
    } = this.props;
    return (
      <Fragment>
        <Row gutter={16} style={flexStyle}>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动名称：</Div>
          </Col>
          <Col span={5}>
            <Input
              value={activityName}
              placeholder="请输入活动标题"
              onChange={event => this.onChangeValue(event.target.value, ACTIVITY_NAME)}
            />
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动ID：</Div>
          </Col>
          <Col span={8}>
            <InputNumber
              style={{ width: '200px' }}
              value={activityId}
              placeholder="请输入活动ID"
              onChange={value => this.onChangeValue(value, ACTIVITY_ID)}
            />
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动入口：</Div>
          </Col>
          <Col span={5}>
            <Select
              value={activityType}
              style={{ width: 120 }}
              onChange={value => this.onChangeValue(value, ACTIVITY_TYPE)}
            >
              <Option value={-1}>全部</Option>
              <Option value={1}>商详</Option>
              <Option value={3}>通天塔</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={16} style={flexStyle}>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动状态：</Div>
          </Col>
          <Col span={5}>
            <Select
              value={activityState}
              style={{ width: 120 }}
              onChange={value => this.onChangeValue(value, ACTIVITY_STATE)}
            >
              <Option value={-1}>全部</Option>
              <Option value={0}>未开始</Option>
              <Option value={1}>正在进行</Option>
              <Option value={2}>已经结束</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动时间：</Div>
          </Col>
          <Col span={8}>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              placeholder={['开始时间', '结束时间']}
              onChange={(dates, dateString) => this.onChange(dates, dateString)}
              value={
                activityStartTime && activityEndTime
                  ? [moment(activityStartTime), moment(activityEndTime)]
                  : []
              }
              // onOk={() => this.onOk()}
            />
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>创建人：</Div>
          </Col>
          <Col span={5}>
            <Input
              value={activityCreater}
              placeholder="请输入采销ERP"
              onChange={event => this.onChangeValue(event.target.value, ACTIVITY_CREATER)}
            />
          </Col>
        </Row>
      </Fragment>
    );
  };

  render() {
    return (
      <Card>
        {this.renderFilter()}
        <Div styleStr={FLEX_SPACEAROUND_CENTER}>
          <Div>
            <Button style={buttonStyle} onClick={() => this.resetQueryFilter()}>
              重置
            </Button>
            <Button style={buttonStyle} type="primary" onClick={() => this.queryActivityList()}>
              查询
            </Button>
          </Div>
          <Div styleStr={'display: none'}>
            <Button style={buttonStyle} type="primary">
              按天查询总数据
            </Button>
            <Button style={buttonStyle} type="primary">
              按活动维度查看
            </Button>
          </Div>
        </Div>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(FilterCard);

function mapStateToProps(state) {
  return {
    activityName: _.get(state, 'activityList.activityName', ''),
    activityId: _.get(state, 'activityList.activityId', -1),
    activityType: _.get(state, 'activityList.activityType', -1),
    activityState: _.get(state, 'activityList.activityState', -1),
    activityStartTime: _.get(state, 'activityList.activityStartTime', 0),
    activityEndTime: _.get(state, 'activityList.activityEndTime', 0),
    activityCreater: _.get(state, 'activityList.activityCreater', ''),
  };
}

const flexStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '20px 0',
};

const buttonStyle = {
  margin: '10px',
};
