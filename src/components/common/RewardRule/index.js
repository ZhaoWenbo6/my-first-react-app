import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import RecipientInfo from '../../CreateActivity/SetReward/RecipientInfo';
import RewardLimit from '../../CreateActivity/SetReward/RewardLimit';
import SharerInfo from '../../CreateActivity/SetReward/SharerInfo';

class RewardRule extends Component {
  static displayName = 'RewardRule';

  render() {
    const {
      sharerRewardInfo,
      recipientRewardInfo,
      disabled,
      shareRewardLimit,
      shareRewardLimitDay,
      viewRewardLimit,
      viewRewardLimitDay,
    } = this.props;
    return (
      <Fragment>
        <SharerInfo rewardPerson={0} sharerRewardInfo={sharerRewardInfo} disabled={disabled} />
        <RecipientInfo
          rewardPerson={1}
          recipientRewardInfo={recipientRewardInfo}
          disabled={disabled}
        />
        <RewardLimit
          sharerRewardInfo={sharerRewardInfo}
          recipientRewardInfo={recipientRewardInfo}
          shareRewardLimit={shareRewardLimit}
          shareRewardLimitDay={shareRewardLimitDay}
          viewRewardLimit={viewRewardLimit}
          viewRewardLimitDay={viewRewardLimitDay}
          disabled={disabled}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(RewardRule);

function mapStateToProps() {
  return {};
}
