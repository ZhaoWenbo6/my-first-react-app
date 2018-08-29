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
import { Card, Row, Col, Input, Select, DatePicker, Button, InputNumber, Tooltip } from 'antd';
import { Div } from '../../../../../components/common/Div';
import { FLEX_SPACEAROUND_CENTER } from '../../../../../consts/css';
import _ from 'lodash';
import {
  ACTIVITY_LIST_NAME,
  ACTIVITY_LIST_ID,
  TYPE,
  ACTIVITY_STATE,
  ACTIVITY_CREATER,
  ACTIVITY_END_TIME,
  ACTIVITY_START_TIME,
  ACTIVITY_LIST_TYPE,
  SHOP_ID,
  CID1,
  CID2,
  CID3,
  CID1_VALUE,
  CID2_VALUE,
  CID3_VALUE,
} from '../../../../../reducer/ActivityList';
import {
  changeActivityListValue,
  requestActivityListInfo,
  resetQueryFilter,
} from '../../../../../actions/ActivityList';
import moment from 'moment';
import { requestClassification } from '../../../../../actions/CreateActivity/addGoods';
import { STRING_ZERO } from '../../../../../consts/const';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class FilterCard extends Component {
  static displayName = 'FilterCard';

  componentDidMount() {
    const { dispatch, cid1 } = this.props;
    if (cid1.length === 0) {
      dispatch(requestClassification(CID1, {}));
    }
  }

  getSecondeValue = value => {
    const { dispatch } = this.props;
    dispatch(changeActivityListValue(CID1_VALUE, value === STRING_ZERO ? STRING_ZERO : value)); //设置一级分类
    dispatch(changeActivityListValue(CID2_VALUE, '0')); //恢复默认值
    dispatch(changeActivityListValue(CID3_VALUE, '0')); //恢复默认值
    dispatch(requestClassification(CID2, { itemFirstCateCd: value })); //查询二级分类
  };

  getThirdValue = value => {
    const { dispatch } = this.props;
    dispatch(changeActivityListValue(CID2_VALUE, value === STRING_ZERO ? STRING_ZERO : value)); //恢复默认值
    dispatch(changeActivityListValue(CID3_VALUE, '0')); //恢复默认值
    dispatch(requestClassification(CID3, { itemSecondCateCd: value }));
  };

  setThirdValue = value => {
    const { dispatch } = this.props;
    dispatch(changeActivityListValue(CID3_VALUE, value === STRING_ZERO ? STRING_ZERO : value)); //恢复默认值
  };

  handleChange = () => {};

  onChange = value => {
    const { dispatch } = this.props;
    dispatch(
      changeActivityListValue(
        ACTIVITY_START_TIME,
        value.length ? Date.parse(new Date(moment(value[0]).valueOf())) : 0
      )
    );
    dispatch(
      changeActivityListValue(
        ACTIVITY_END_TIME,
        value.length ? Date.parse(new Date(moment(value[1]).valueOf())) : 0
      )
    );
  };

  onChangeValue = (value, type) => {
    const { dispatch } = this.props;
    if (value !== undefined) {
      dispatch(
        changeActivityListValue(
          type,
          type === ACTIVITY_LIST_ID ? (typeof value === 'number' ? value : '') : value
        )
      );
    }
  };

  queryActivityList = () => {
    const { dispatch } = this.props;
    dispatch(requestActivityListInfo(1, 10));
  };

  resetQueryFilter = () => {
    const { dispatch } = this.props;
    dispatch(resetQueryFilter());
  };

  renderAdminFilter = () => {
    const {
      activityListType,
      cid1,
      cid2,
      cid3,
      cid1Value,
      cid2Value,
      cid3Value,
      shopId,
    } = this.props;
    const firstSelectDom = cid1.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    const secondSelectDom = cid2.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    const thirdSelectDom = cid3.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    return (
      <Fragment>
        <Row gutter={16} style={flexStyle}>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动类型：</Div>
          </Col>
          <Col span={5}>
            <Select
              value={activityListType}
              style={{ width: 120 }}
              onChange={value => this.onChangeValue(value, ACTIVITY_LIST_TYPE)}
            >
              <Option value={-1}>全部</Option>
              <Option value={0}>POP</Option>
              <Option value={1}>自营</Option>
            </Select>
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>自营所属分类：</Div>
          </Col>
          <Col span={8}>
            <Select
              defaultValue="请选择一级分类"
              style={{ width: 100 }}
              value={cid1Value}
              onSelect={value => this.getSecondeValue(value)}
            >
              <Option value="0">请选择一级分类</Option>
              {firstSelectDom}
            </Select>
            <Select
              defaultValue="请选择二级分类"
              style={{ width: 100 }}
              value={cid2Value}
              onSelect={value => this.getThirdValue(value)}
            >
              <Option value="0">请选择二级分类</Option>
              {secondSelectDom}
            </Select>
            <Select
              defaultValue="请选择三级分类"
              style={{ width: 100 }}
              value={cid3Value}
              onSelect={value => this.setThirdValue(value)}
            >
              <Option value="0">请选择三级分类</Option>
              {thirdSelectDom}
            </Select>
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>店铺ID：</Div>
          </Col>
          <Col span={5}>
            <Input
              value={shopId}
              placeholder="请输入店铺ID"
              onChange={event => this.onChangeValue(event.target.value, SHOP_ID)}
            />
          </Col>
        </Row>
      </Fragment>
    );
  };

  renderFilter = () => {
    const {
      activityListName,
      activityListId,
      type,
      activityState,
      activityStartTime,
      activityEndTime,
      activityCreater,
      level,
    } = this.props;
    return (
      <Fragment>
        <Row gutter={16} style={flexStyle}>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动名称：</Div>
          </Col>
          <Col span={5}>
            <Input
              value={activityListName}
              placeholder="请输入活动标题"
              onChange={event => this.onChangeValue(event.target.value, ACTIVITY_LIST_NAME)}
            />
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动ID：</Div>
          </Col>
          <Col span={8}>
            <Div styleStr="display:flex;align-items: center;">
              <InputNumber
                style={{ width: '200px' }}
                value={activityListId}
                maxLength={18}
                placeholder="请输入活动ID"
                onChange={value => this.onChangeValue(value, ACTIVITY_LIST_ID)}
              />
              {activityListId.length === 18 ? (
                <Div styleStr="color: red">ID位数为18位以内</Div>
              ) : (
                <Fragment />
              )}
            </Div>
          </Col>
          <Col span={2}>
            <Div styleStr={'width: 100px;'}>活动入口：</Div>
          </Col>
          <Col span={5}>
            <Select
              value={type}
              style={{ width: 120 }}
              onChange={value => this.onChangeValue(value, TYPE)}
            >
              <Option value={-1}>全部</Option>
              <Option value={1}>商详</Option>
              {level ? null : <Option value={2}>店铺</Option>}
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
            <Div styleStr={'width: 100px;'}>创建时间：</Div>
          </Col>
          <Col span={8}>
            <RangePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY/MM/DD HH:mm:ss"
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
    const { level } = this.props;
    return (
      <Card>
        {this.renderFilter()}
        {level ? <Fragment /> : this.renderAdminFilter()}
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
    level: _.get(state, 'user.info.level', {}),
    activityListName: _.get(state, 'activityList.activityListName', ''),
    activityListId: _.get(state, 'activityList.activityListId', -1),
    type: _.get(state, 'activityList.type', -1),
    activityState: _.get(state, 'activityList.activityState', -1),
    activityStartTime: _.get(state, 'activityList.activityStartTime', 0),
    activityEndTime: _.get(state, 'activityList.activityEndTime', 0),
    activityCreater: _.get(state, 'activityList.activityCreater', ''),
    activityListType: _.get(state, 'activityList.activityListType', -1),
    shopId: _.get(state, 'activityList.shopId', 0),
    cid1: _.get(state, 'activityList.cid1', []),
    cid2: _.get(state, 'activityList.cid2', []),
    cid3: _.get(state, 'activityList.cid3', []),
    cid1Value: _.get(state, 'activityList.cid1Value', '0'),
    cid2Value: _.get(state, 'activityList.cid2Value', '0'),
    cid3Value: _.get(state, 'activityList.cid3Value', '0'),
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
