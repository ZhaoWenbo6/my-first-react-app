import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkJBean, checkCoupon } from '../../../utils/api-service';
import { Div } from '../../common/Div';
import SharerInfo from './SharerInfo';
import RecipientInfo from './RecipientInfo';
import RewardLimit from './RewardLimit';
import _ from 'lodash';

class SetReward extends Component {
  static displayName = 'SetReward';

  jingdou = () => {
    checkJBean({
      callerId: '440',
      businessId: '17496',
      topBusinessId: '10000',
      secondBusinessId: '10013',
      key: 'c488d7e994c4495bb1fa87f9fb046522',
    }).then(response => {
      console.log(response);
    });
  };

  coupon = () => {
    checkCoupon({
      activityKey: 1,
      activityStartTime: 1531811238000,
      activityEndTime: 1531811252000,
    }).then(response => {
      console.log(response);
    });
  };

  render() {
    const { sharerRewardInfo, recipientRewardInfo } = this.props;
    return (
      <Div>
        <SharerInfo rewardPerson={0} sharerRewardInfo={sharerRewardInfo} disabled={false} />
        <RecipientInfo
          rewardPerson={1}
          recipientRewardInfo={recipientRewardInfo}
          disabled={false}
        />
        <RewardLimit disabled={false} />
      </Div>
    );
  }
}

export default connect(mapStateToProps)(SetReward);

function mapStateToProps(state) {
  return {
    sharerRewardInfo: _.get(state, 'create.rewardInfo.sharerRewardInfo'),
    recipientRewardInfo: _.get(state, 'create.rewardInfo.recipientRewardInfo'),
  };
}
