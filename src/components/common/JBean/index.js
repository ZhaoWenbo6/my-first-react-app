import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../Div';
import { Radio, Card, InputNumber, Input, Row, Col, message } from 'antd';
import { FLEX_START_CENTER } from '../../../consts/css';
import _ from 'lodash';
import { checkJBean } from '../../../utils/api-service';
import {
  CALLER_CODE,
  BUSINESS_CODE,
  SECOND_BUSINESSID,
  KEY,
  ORG_ID,
  TOP_BUSINESSID,
  PRIZE_QUOTA_TIME,
  PRIZE_QUOTA_DAY,
  PRIZE_QUOTA,
} from '../../../consts/const';
import { updateRewardInfo } from '../../../actions/CreateActivity/rewardInfo';
import { RESPONSE_CODE_ZERO } from '../../../consts/api';

const RadioGroup = Radio.Group;
class JBean extends Component {
  static displayName = 'JBean';

  constructor(props) {
    super(props);
    this.state = {};
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleChange = (event, keyName = '') => {
    const { dispatch, rewardPerson, domIndex, itemInfo } = this.props;
    const {
      callerCode = '',
      key = '',
      businessCode = '',
      topBusinessId = '',
      secondBusinessId = '',
    } = itemInfo;
    event.persist();
    const { value } = event.target;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        updateList: { ...itemInfo, [keyName]: value },
        option: 'update',
      })
    );
    if (
      [callerCode, key, businessCode, topBusinessId, secondBusinessId].filter(
        item => item.replace(/\s/g, '').length === 0
      ).length === 0
    ) {
      this.emitChangeDebounced();
    }
  };

  emitChange = () => {
    const {
      dispatch,
      rewardPerson,
      domIndex,
      itemInfo,
      itemInfo: { callerCode, businessCode, topBusinessId, secondBusinessId, key },
    } = this.props;
    checkJBean({
      callerId: callerCode,
      businessId: businessCode,
      topBusinessId: topBusinessId,
      secondBusinessId: secondBusinessId,
      key: key,
      // orgId: orgId,
    }).then(response => {
      const { status } = response;
      if (status === 200) {
        const {
          data: { code, result, message: responseMessage },
        } = response;
        if (code === RESPONSE_CODE_ZERO) {
          message.success(`检验成功，目前还有${result}个京豆`);
          dispatch(
            updateRewardInfo({
              rewardPerson: rewardPerson,
              domIndex: domIndex,
              updateList: { ...itemInfo, JBeanNum: result },
              option: 'update',
            })
          );
        } else {
          dispatch(
            updateRewardInfo({
              rewardPerson: rewardPerson,
              domIndex: domIndex,
              updateList: { ...itemInfo, JBeanNum: 0 },
              option: 'update',
            })
          );
          message.error(responseMessage);
        }
      }
      console.log(response);
    });
  };

  updateValue = (value, keyName = '') => {
    const { dispatch, rewardPerson, domIndex, itemInfo } = this.props;
    if (parseInt(value, 10) !== NaN) {
      dispatch(
        updateRewardInfo({
          rewardPerson: rewardPerson,
          domIndex: domIndex,
          updateList: { ...itemInfo, [keyName]: Math.floor(value) },
          option: 'update',
        })
      );
    }
  };

  render() {
    const {
      itemInfo: {
        prizeQuota,
        prizeQuotaDay,
        prizeQuotaTime,
        callerCode,
        key,
        businessCode,
        topBusinessId,
        secondBusinessId,
        orgId,
      },
      disabled,
    } = this.props;
    return (
      <Card style={{ width: 700 }}>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每次发豆数量：</Div>
          <RadioGroup
            onChange={event => this.updateValue(event.target.value, PRIZE_QUOTA_TIME)}
            value={prizeQuotaTime}
            disabled={disabled}
          >
            <Radio value={1}>1京豆</Radio>
            <Radio value={3}>3京豆</Radio>
            <Radio value={5}>5京豆</Radio>
            <Radio value={10}>10京豆</Radio>
            <Radio value={15}>15京豆</Radio>
            <Radio value={20}>20京豆</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每天赠送份数：</Div>
          <InputNumber
            min={0}
            value={prizeQuotaDay}
            placeholder="请输入赠送数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA_DAY)}
            disabled={disabled}
          />
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>总赠送豆份数：</Div>
          <InputNumber
            min={0}
            value={prizeQuota}
            placeholder="请输入赠送数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA)}
            disabled={disabled}
          />
        </Div>
        <Row gutter={16} style={rowStyle}>
          <Col span={4}>
            <Div>调用者编号：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入调用者编号："
              value={callerCode}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, CALLER_CODE)}
              disabled={disabled}
            />
          </Col>
          <Col span={4}>
            <Div>业务方编号：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入业务方编号"
              value={businessCode}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, BUSINESS_CODE)}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row gutter={16} style={rowStyle}>
          <Col span={4}>
            <Div>一级编号：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入一级编号"
              value={topBusinessId}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, TOP_BUSINESSID)}
              disabled={disabled}
            />
          </Col>
          <Col span={4}>
            <Div>二级编号：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入二级编号"
              value={secondBusinessId}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, SECOND_BUSINESSID)}
              disabled={disabled}
            />
          </Col>
        </Row>
        <Row gutter={16} style={rowStyle}>
          <Col span={4}>
            <Div>key：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入key"
              value={key}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, KEY)}
              disabled={disabled}
            />
          </Col>
          <Col span={4}>
            <Div>机构号：</Div>
          </Col>
          <Col span={8}>
            <Input
              placeholder="请输入机构号"
              value={orgId}
              style={{ width: '200px' }}
              onChange={event => this.handleChange(event, ORG_ID)}
              disabled={disabled}
            />
          </Col>
        </Row>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(JBean);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const rowStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 10px 10px',
};
