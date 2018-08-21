import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import { Card, InputNumber, Radio, Tooltip } from 'antd';
import { FLEX_COL_CENTER_START, MARGIN_TEN } from '../../../../consts/css';
import { changeRewardInfo } from '../../../../actions/CreateActivity/rewardInfo';
import {
  SHARE_REWARD_LIMIT,
  SHARE_REWARD_LIMIT_DAY,
  VIEW_REWARD_LIMIT_DAY,
  VIEW_REWARD_LIMIT,
} from '../../../../reducer/ActivityManagement/rewardInfo';

const RadioGroup = Radio.Group;
class RewardLimit extends Component {
  static displayName = 'RewardLimit';
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (value, type) => {
    const { dispatch } = this.props;
    if (value !== undefined) {
      dispatch(changeRewardInfo(type, value));
    }
  };

  render() {
    const {
      shareRewardLimit,
      shareRewardLimitDay,
      viewRewardLimit,
      viewRewardLimitDay,
      disabled,
      sharerRewardInfo,
      recipientRewardInfo,
    } = this.props;
    const shareRewardLimitCount = [];
    const shareRewardLimitDayCount = [];
    const viewRewardLimitCount = [];
    const viewRewardLimitDayCount = [];
    sharerRewardInfo &&
      sharerRewardInfo.map(item => {
        if (item.rewardType === 4) {
          const { prizeQuota, prizeQuotaDay } = item;
          shareRewardLimitCount.push(prizeQuota);
          shareRewardLimitDayCount.push(prizeQuotaDay);
        } else if (item.rewardType === 5) {
          shareRewardLimitCount.push(item.prizeQuota);
          shareRewardLimitDayCount.push(item.prizeQuotaDay);
        }
      });
    recipientRewardInfo &&
      recipientRewardInfo.map(item => {
        if (item.rewardType === 4) {
          const { prizeQuota, prizeQuotaDay } = item;
          viewRewardLimitCount.push(prizeQuota);
          viewRewardLimitDayCount.push(prizeQuotaDay);
        } else if (item.rewardType === 5) {
          viewRewardLimitCount.push(item.prizeQuota);
          viewRewardLimitDayCount.push(item.prizeQuotaDay);
        }
      });
    const shareRewardLimitStyle = `display: inline-block; color: red;margin: 0 30px; visibility:${
      !disabled &&
      shareRewardLimit >
        (shareRewardLimitCount.length > 0
          ? shareRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
          : 0)
        ? 'visible'
        : 'hidden'
    }`;
    const shareRewardLimitDayStyle = `display: inline-block; color: red;margin: 0 30px; visibility:${
      !disabled &&
      shareRewardLimitDay >
        (shareRewardLimitDayCount.length > 0
          ? shareRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
          : 0)
        ? 'visible'
        : 'hidden'
    }`;
    const viewRewardLimitStyle = `display: inline-block; color: red;margin: 0 30px; visibility:${
      !disabled &&
      viewRewardLimit >
        (viewRewardLimitCount.length > 0
          ? viewRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
          : 0)
        ? 'visible'
        : 'hidden'
    }`;
    const viewRewardLimitDayStyle = `display: inline-block; color: red;margin: 0 30px; visibility:${
      !disabled &&
      viewRewardLimitDay >
        (viewRewardLimitDayCount.length > 0
          ? viewRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
          : 0)
        ? 'visible'
        : 'hidden'
    }`;

    return (
      <Fragment>
        <h2>3.设置返利次数限制</h2>
        <Card style={{ width: 800 }}>
          <h3>设置分享者返奖次数限制</h3>
          <Div styleStr={`${FLEX_COL_CENTER_START}; margin: 10px 30px`}>
            <h4>活动期间最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, SHARE_REWARD_LIMIT)}
                value={shareRewardLimit ? 1 : 0}
                disabled={disabled}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: shareRewardLimit ? 'visible' : 'hidden' }}
                min={1}
                maxLength={18}
                value={shareRewardLimit}
                disabled={disabled}
                onChange={value => this.onChange(value, SHARE_REWARD_LIMIT)}
              />
              <Div styleStr={shareRewardLimitStyle}>
                <Tooltip
                  placement="topLeft"
                  title={`应小于等于分享者最高奖池的数量${
                    shareRewardLimitCount.length > 0
                      ? shareRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
                      : 0
                  }`}
                >
                  应小于等于分享者最高奖池的数量{shareRewardLimitCount.length > 0
                    ? shareRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
                    : 0}
                </Tooltip>
              </Div>
            </Div>
            <h4>每天最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, SHARE_REWARD_LIMIT_DAY)}
                value={shareRewardLimitDay ? 1 : 0}
                disabled={disabled}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: shareRewardLimitDay ? 'visible' : 'hidden' }}
                min={1}
                maxLength={18}
                value={shareRewardLimitDay}
                disabled={disabled}
                onChange={value => this.onChange(value, SHARE_REWARD_LIMIT_DAY)}
              />
              <Div styleStr={shareRewardLimitDayStyle}>
                <Tooltip
                  placement="topLeft"
                  title={`应小于等于分享者每日最高奖池的数量${
                    shareRewardLimitDayCount.length > 0
                      ? shareRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
                      : 0
                  }`}
                >
                  应小于等于分享者每日最高奖池的数量{shareRewardLimitDayCount.length > 0
                    ? shareRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
                    : 0}
                </Tooltip>
              </Div>
            </Div>
          </Div>
          <h3>设置被分享者返奖次数限制</h3>
          <Div styleStr={`${FLEX_COL_CENTER_START}; margin: 10px 30px`}>
            <h4>活动期间最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, VIEW_REWARD_LIMIT)}
                value={viewRewardLimit ? 1 : 0}
                disabled={disabled ? true : !recipientRewardInfo.length}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: viewRewardLimit ? 'visible' : 'hidden' }}
                min={1}
                maxLength={18}
                value={viewRewardLimit}
                disabled={disabled}
                onChange={value => this.onChange(value, VIEW_REWARD_LIMIT)}
              />
              <Div styleStr={viewRewardLimitStyle}>
                <Tooltip
                  placement="topLeft"
                  title={`应小于等于被分享者最高奖池的数量${
                    viewRewardLimitCount.length > 0
                      ? viewRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
                      : 0
                  }`}
                >
                  应小于等于被分享者最高奖池的数量{viewRewardLimitCount.length > 0
                    ? viewRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
                    : 0}
                </Tooltip>
              </Div>
            </Div>
            <h4>每天最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, VIEW_REWARD_LIMIT_DAY)}
                value={viewRewardLimitDay ? 1 : 0}
                disabled={disabled ? true : !recipientRewardInfo.length}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: viewRewardLimitDay ? 'visible' : 'hidden' }}
                min={1}
                maxLength={18}
                value={viewRewardLimitDay}
                disabled={disabled}
                onChange={value => this.onChange(value, VIEW_REWARD_LIMIT_DAY)}
              />
              <Div styleStr={viewRewardLimitDayStyle}>
                <Tooltip
                  placement="topLeft"
                  title={`应小于等于被分享者每日最高奖池的数量${
                    viewRewardLimitDayCount.length > 0
                      ? viewRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
                      : 0
                  }`}
                >
                  应小于等于被分享者每日最高奖池的数量{viewRewardLimitDayCount.length > 0
                    ? viewRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
                    : 0}
                </Tooltip>
              </Div>
            </Div>
          </Div>
        </Card>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(RewardLimit);

function mapStateToProps() {
  return {};
}
