import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../common/Div';
import SharerInfo from './SharerInfo';
import RecipientInfo from './RecipientInfo';
import RewardLimit from './RewardLimit';
import _ from 'lodash';

class SetReward extends Component {
  static displayName = 'SetReward';

  render() {
    const {
      rewardInfo: {
        sharerRewardInfo,
        recipientRewardInfo,
        shareRewardLimit,
        shareRewardLimitDay,
        viewRewardLimit,
        viewRewardLimitDay,
      },
    } = this.props;
    return (
      <Div>
        <SharerInfo rewardPerson={0} sharerRewardInfo={sharerRewardInfo} disabled={false} />
        <RecipientInfo
          rewardPerson={1}
          recipientRewardInfo={recipientRewardInfo}
          disabled={false}
        />
        <RewardLimit
          disabled={false}
          shareRewardLimit={shareRewardLimit}
          shareRewardLimitDay={shareRewardLimitDay}
          viewRewardLimit={viewRewardLimit}
          viewRewardLimitDay={viewRewardLimitDay}
          sharerRewardInfo={sharerRewardInfo}
          recipientRewardInfo={recipientRewardInfo}
        />
      </Div>
    );
  }
}

export default connect(mapStateToProps)(SetReward);

function mapStateToProps(state) {
  return {
    rewardInfo: _.get(state, 'create.rewardInfo'),
  };
}
