import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import { Card, InputNumber, Radio } from 'antd';
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
    dispatch(changeRewardInfo(type, value));
  };

  render() {
    const {
      shareRewardLimit,
      shareRewardLimitDay,
      viewRewardLimit,
      viewRewardLimitDay,
      disabled,
    } = this.props;
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
                value={shareRewardLimit}
                disabled={disabled}
                onChange={value => this.onChange(value, SHARE_REWARD_LIMIT)}
              />
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
                value={shareRewardLimitDay}
                disabled={disabled}
                onChange={value => this.onChange(value, SHARE_REWARD_LIMIT_DAY)}
              />
            </Div>
          </Div>
          <h3>设置被分享者返奖次数限制</h3>
          <Div styleStr={`${FLEX_COL_CENTER_START}; margin: 10px 30px`}>
            <h4>活动期间最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, VIEW_REWARD_LIMIT)}
                value={viewRewardLimit ? 1 : 0}
                disabled={disabled}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: viewRewardLimit ? 'visible' : 'hidden' }}
                min={1}
                value={viewRewardLimit}
                disabled={disabled}
                onChange={value => this.onChange(value, VIEW_REWARD_LIMIT)}
              />
            </Div>
            <h4>每天最高返利次数：</h4>
            <Div styleStr={MARGIN_TEN}>
              <RadioGroup
                onChange={event => this.onChange(event.target.value, VIEW_REWARD_LIMIT_DAY)}
                value={viewRewardLimitDay ? 1 : 0}
                disabled={disabled}
              >
                <Radio value={0}>不限</Radio>
                <Radio value={1}>限制</Radio>
              </RadioGroup>
              <InputNumber
                style={{ visibility: viewRewardLimitDay ? 'visible' : 'hidden' }}
                min={1}
                value={viewRewardLimitDay}
                disabled={disabled}
                onChange={value => this.onChange(value, VIEW_REWARD_LIMIT_DAY)}
              />
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
