import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../common/Div';
import BaseInfo from '../../common/BaseInfo';
import GoodsCodes from '../../common/GoodsCodes';
import RewardRule from '../../common/RewardRule';
import _ from 'lodash';
import { Title } from '../../common/Title';

class ActivityPreview extends Component {
  static displayName = 'ActivityPreview';

  render() {
    const {
      baseInfo,
      addGoods,
      sharerRewardInfo,
      recipientRewardInfo,
      shareRewardLimit,
      shareRewardLimitDay,
      viewRewardLimit,
      viewRewardLimitDay,
    } = this.props;
    return (
      <Div>
        <Title>1.活动基本信息</Title>
        <BaseInfo data={baseInfo} isDetails={false} />
        <Title>2.业务编号</Title>
        <GoodsCodes data={addGoods} />
        <Title>3.奖励信息</Title>
        <RewardRule
          sharerRewardInfo={sharerRewardInfo}
          recipientRewardInfo={recipientRewardInfo}
          shareRewardLimit={shareRewardLimit}
          shareRewardLimitDay={shareRewardLimitDay}
          viewRewardLimit={viewRewardLimit}
          viewRewardLimitDay={viewRewardLimitDay}
          disabled={true}
        />
      </Div>
    );
  }
}

export default connect(mapStateToProps)(ActivityPreview);

function mapStateToProps(state) {
  return {
    baseInfo: _.get(state, 'create.baseInfo', {}),
    addGoods: _.get(state, 'create.addGoods', {}),
    sharerRewardInfo: _.get(state, 'create.rewardInfo.sharerRewardInfo'),
    recipientRewardInfo: _.get(state, 'create.rewardInfo.recipientRewardInfo'),
    shareRewardLimit: _.get(state, 'create.rewardInfo.shareRewardLimit', 0),
    shareRewardLimitDay: _.get(state, 'create.rewardInfo.shareRewardLimitDay', 0),
    viewRewardLimit: _.get(state, 'create.rewardInfo.viewRewardLimit', 0),
    viewRewardLimitDay: _.get(state, 'create.rewardInfo.viewRewardLimitDay', 0),
  };
}
