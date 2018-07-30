import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Card, message, Input, Tooltip } from 'antd';
import { Div } from '../Div';
import { FLEX_START_CENTER } from '../../../consts/css';
import { updateRewardInfo } from '../../../actions/CreateActivity/rewardInfo';
import { COUPON_ID, PRIZE_QUOTA_DAY, PRIZE_QUOTA } from '../../../consts/const';
import { checkCoupon } from '../../../utils/api-service';
import _ from 'lodash';
import { RESPONSE_CODE_ZERO } from '../../../consts/api';
import { SINGLE_LINE_OMITTED } from '../../../consts/css';

class Coupon extends Component {
  static displayName = 'Coupon';

  constructor(props) {
    super(props);
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleChange = event => {
    const { dispatch, rewardPerson, domIndex, itemInfo } = this.props;
    event.persist();
    const { value } = event.target;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        updateList: { ...itemInfo, [COUPON_ID]: value, couponName: '', couponNum: 0 },
        option: 'update',
      })
    );
    this.emitChangeDebounced(event);
  };

  emitChange = event => {
    const {
      dispatch,
      rewardPerson,
      domIndex,
      itemInfo,
      activityStartTime,
      activityEndTime,
    } = this.props;
    const {
      target: { value },
    } = event;
    if (value !== '') {
      checkCoupon({
        activityKey: value,
        activityStartTime: activityStartTime,
        activityEndTime: activityEndTime,
      }).then(response => {
        const {
          data: { code, message: responseMessage },
          status,
        } = response;
        console.log(response);
        if (status === 200) {
          if (code === RESPONSE_CODE_ZERO) {
            const {
              data: {
                result: { name, num },
              },
            } = response;
            dispatch(
              updateRewardInfo({
                rewardPerson: rewardPerson,
                domIndex: domIndex,
                updateList: { ...itemInfo, [COUPON_ID]: value, couponName: name, couponNum: num },
                option: 'update',
              })
            );
          } else {
            dispatch(
              updateRewardInfo({
                rewardPerson: rewardPerson,
                domIndex: domIndex,
                updateList: {
                  ...itemInfo,
                  [COUPON_ID]: '',
                  couponName: responseMessage,
                  couponNum: 0,
                },
                option: 'update',
              })
            );
          }
        } else {
          message.error(`请求异常：状态码为${status}`);
        }
      });
    }
  };

  updateValue = (value, keyName) => {
    const { dispatch, rewardPerson, domIndex, itemInfo } = this.props;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        updateList: { ...itemInfo, [keyName]: value, couponName: '', couponNum: 0 },
        option: 'update',
      })
    );
  };

  render() {
    const {
      itemInfo: { couponId, prizeQuota, prizeQuotaDay, couponName },
      disabled,
    } = this.props;
    const nameLimitStyle = `color: red;margin: 0 30px; visibility:${
      prizeQuota && prizeQuotaDay && prizeQuota >= prizeQuotaDay ? 'hidden' : 'visible'
    }`;

    return (
      <Card style={{ width: 750 }}>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>优惠券批次ID：</Div>
          <Input
            value={couponId}
            placeholder="请输入优惠券ID"
            style={{ width: '200px' }}
            onChange={event => this.handleChange(event)}
            disabled={disabled}
          />
          {couponName === '' ? (
            <Fragment />
          ) : (
            <Div styleStr={`color: red; margin: 0 30px;${SINGLE_LINE_OMITTED}; width: 280px;`}>
              <Tooltip placement="topLeft" title={couponName}>
                {couponName}
              </Tooltip>
            </Div>
          )}
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每天发放数量：</Div>
          <InputNumber
            min={0}
            value={prizeQuotaDay}
            placeholder="请输入发放数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA_DAY)}
            disabled={disabled}
          />
          <Div styleStr={nameLimitStyle}>
            <Tooltip placement="topLeft" title={couponName}>
              每天发放数量要大于等于总发放量且不能等于0
            </Tooltip>
          </Div>
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>总发放券数量：</Div>
          <InputNumber
            min={0}
            value={prizeQuota}
            placeholder="请输入发放数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA)}
            disabled={disabled}
          />
          <Div styleStr={nameLimitStyle}>
            <Tooltip placement="topLeft" title={couponName}>
              每天发放数量要小于等于总发放量且不能等于0
            </Tooltip>
          </Div>
        </Div>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(Coupon);

function mapStateToProps(state) {
  return {
    activityStartTime: _.get(state, 'create.baseInfo.activityStartTime', 0),
    activityEndTime: _.get(state, 'create.baseInfo.activityEndTime', 0),
  };
}
