import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InputNumber, Card, message, Input } from 'antd';
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
    this.emitChangeDebounced = _.debounce(this.emitChange, 4000);
  }

  handleChange = event => {
    const { dispatch, rewardPerson, domIndex, itemInfo } = this.props;
    event.persist();
    const { value } = event.target;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        updateList: {
          ...itemInfo,
          [COUPON_ID]: value,
          couponName: '',
          couponNum: 0,
          prizeQuotaTime: 1,
        },
        option: 'update',
      })
    );
    this.emitChangeDebounced(event);
  };

  deduplication = (arr, value) => {
    if (arr.filter(item => item.couponId.toLowerCase() === value.toLowerCase()).length > 1) {
      message.warning('输入优惠券Key重复');
      return '';
    } else {
      return value;
    }
  };

  deduplicationNumber = (arr, value) => {
    if (arr.filter(item => item.couponId === value).length > 1) {
      message.warning('输入优惠券Key重复');
      return '';
    } else {
      return value;
    }
  };

  emitChange = event => {
    const {
      dispatch,
      rewardPerson,
      domIndex,
      itemInfo,
      startTime,
      endTime,
      sharerRewardInfo,
      recipientRewardInfo,
    } = this.props;
    const {
      target: { value },
    } = event;
    if (value !== '') {
      checkCoupon({
        activityKey: value,
        activityStartTime: startTime,
        activityEndTime: endTime,
      }).then(response => {
        const {
          data: { code, message: responseMessage },
          status,
        } = response;
        if (status === 200) {
          let resultValue = '';
          let resultName = '';
          let resultCount = 0;
          if (code === RESPONSE_CODE_ZERO) {
            const {
              data: {
                result: { name, num },
              },
            } = response;
            resultValue = this.deduplication(
              itemInfo.rewardPerson ? recipientRewardInfo : sharerRewardInfo,
              value
            );
            resultName = this.deduplication(
              itemInfo.rewardPerson ? recipientRewardInfo : sharerRewardInfo,
              name
            );
            resultCount = this.deduplicationNumber(
              itemInfo.rewardPerson ? recipientRewardInfo : sharerRewardInfo,
              num
            );
            dispatch(
              updateRewardInfo({
                rewardPerson: rewardPerson,
                domIndex: domIndex,
                updateList: {
                  ...itemInfo,
                  [COUPON_ID]: resultValue,
                  couponName: resultName,
                  couponNum: resultCount,
                },
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
                  [COUPON_ID]: resultValue,
                  couponName: responseMessage,
                  couponNum: resultCount,
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
        updateList: {
          ...itemInfo,
          [keyName]: typeof value === 'number' ? Math.floor(value) : value,
        },
        option: 'update',
      })
    );
  };

  render() {
    const {
      itemInfo: { couponId, prizeQuota, prizeQuotaDay, couponName, couponNum },
      disabled,
    } = this.props;
    const nameLimitStyle = `color: red;margin: 0 30px; visibility:${
      prizeQuota && prizeQuotaDay && prizeQuota >= prizeQuotaDay ? 'hidden' : 'visible'
    }`;

    return (
      <Card style={{ width: 750 }}>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px 30px 10px 10px'}>优惠券Key：</Div>
          <Input
            value={couponId}
            placeholder="请输入优惠券Key"
            style={{ width: '200px' }}
            onChange={event => this.handleChange(event)}
            disabled={disabled}
          />
          {couponName === '' ? (
            <Fragment />
          ) : (
            <Div
              styleStr={`color: ${
                couponId.length ? 'black' : 'red'
              }; margin: 0 30px;${SINGLE_LINE_OMITTED}; width: 280px;`}
            >
              {/*<Tooltip placement="topLeft" title={couponName}>*/}
              {couponName}
              {/*</Tooltip>*/}
            </Div>
          )}
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每天发放数量：</Div>
          <InputNumber
            min={0}
            value={prizeQuotaDay}
            placeholder="请输入发放数量"
            maxLength={18}
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA_DAY)}
            disabled={disabled}
          />
          <Div styleStr={nameLimitStyle}>
            {/*<Tooltip placement="topLeft" title={couponName}>*/}
            每天发放数量要小于等于总发放量且大于0
            {/*</Tooltip>*/}
          </Div>
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>总发放券数量：</Div>
          <InputNumber
            min={0}
            value={prizeQuota}
            placeholder="请输入发放数量"
            maxLength={18}
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA)}
            disabled={disabled}
          />
          <Div styleStr={nameLimitStyle}>
            {/*<Tooltip placement="topLeft" title={couponName}>*/}
            总发放数量要大于等于每天发放量且大于0
            {/*</Tooltip>*/}
          </Div>
        </Div>
        {couponName !== '' && couponNum < prizeQuota ? (
          <Div styleStr={`color: red; margin: 0 30px;${SINGLE_LINE_OMITTED}; width: 280px;`}>
            {/*<Tooltip placement="topLeft" title={`超过优惠券剩余总数，目前仅剩${couponNum}`}>*/}
            {`超过优惠券剩余总数，目前仅剩${couponNum}`}
            {/*</Tooltip>*/}
          </Div>
        ) : (
          <Fragment />
        )}
      </Card>
    );
  }
}

export default connect(mapStateToProps)(Coupon);

function mapStateToProps(state) {
  return {
    startTime: _.get(state, 'create.baseInfo.startTime', 0),
    endTime: _.get(state, 'create.baseInfo.endTime', 0),
    sharerRewardInfo: _.get(state, 'create.rewardInfo.sharerRewardInfo', []),
    recipientRewardInfo: _.get(state, 'create.rewardInfo.recipientRewardInfo', []),
  };
}
