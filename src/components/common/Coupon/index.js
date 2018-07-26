import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Card, message } from 'antd';
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
  }

  updateValue = (value, keyName) => {
    const {
      dispatch,
      rewardPerson,
      domIndex,
      itemInfo,
      activityStartTime,
      activityEndTime,
    } = this.props;
    if (keyName === COUPON_ID && value !== 0) {
      checkCoupon({
        activityKey: value,
        activityStartTime: activityStartTime,
        activityEndTime: activityEndTime,
      }).then(response => {
        const {
          data: { code, message: responseMessage },
        } = response;
        console.log(response);
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
              updateList: { ...itemInfo, [keyName]: value, couponName: name, couponNum: num },
              option: 'update',
            })
          );
        } else {
          dispatch(
            updateRewardInfo({
              rewardPerson: rewardPerson,
              domIndex: domIndex,
              updateList: { ...itemInfo, [keyName]: 0, couponName: '', couponNum: 0 },
              option: 'update',
            })
          );
          message.error(responseMessage);
        }
      });
    } else {
      dispatch(
        updateRewardInfo({
          rewardPerson: rewardPerson,
          domIndex: domIndex,
          updateList: { ...itemInfo, [keyName]: value, couponName: '', couponNum: 0 },
          option: 'update',
        })
      );
    }
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
          <InputNumber
            min={0}
            value={couponId}
            placeholder="请输入优惠券ID"
            style={{ width: '200px' }}
            onChange={_.debounce(value => this.updateValue(value, COUPON_ID), 1000)}
            disabled={disabled}
          />
          {couponName === '' ? (
            <Fragment />
          ) : (
            <Div styleStr={`margin: 0 30px;${SINGLE_LINE_OMITTED}; width: 280px;`}>
              {couponName}
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
          <Div styleStr={nameLimitStyle}>每天发放数量要大于等于总发放量且不能等于0</Div>
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
          <Div styleStr={nameLimitStyle}>每天发放数量要小于等于总发放量且不能等于0</Div>
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
