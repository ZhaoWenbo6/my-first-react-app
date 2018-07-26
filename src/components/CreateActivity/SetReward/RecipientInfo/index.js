import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import RewardType from '../../../common/RewardType';
import { Button, message } from 'antd';
import { updateRewardInfo } from '../../../../actions/CreateActivity/rewardInfo';

class RecipientInfo extends Component {
  static displayName = 'RecipientInfo';
  constructor(props) {
    super(props);
  }

  addReward = () => {
    const { dispatch, rewardPerson, recipientRewardInfo } = this.props;
    const module = {
      rewardPerson: 0, //奖励人：0:分享者，1:被分享者
      rewardType: 4, //奖励类型：1:优惠券，2:京豆，3:店铺积分,4:自营优惠券，5自营京豆
      couponId: 0, //优惠券id/优惠券key
      prizeQuota: 0, //奖品总量
      prizeQuotaDay: 0, //每天发放奖品总量
      rewardRuleCategory: 0, //奖励规则：0，分享者分享完成；1，被分享者查看，3、分享者阶梯奖励，默认都是0
      couponName: '',
      couponNum: 0,
    };
    // delete test.random;
    if (recipientRewardInfo.length < 5) {
      dispatch(
        updateRewardInfo({
          rewardPerson: rewardPerson,
          updateList: module,
          option: 'add',
        })
      );
    } else {
      message.error('已超过奖励限制');
    }
  };

  render() {
    const { recipientRewardInfo, rewardPerson, disabled } = this.props;
    return (
      <Div>
        <h2>2.设置被分享者信息</h2>
        {recipientRewardInfo.map((item, index) => {
          !item.random && (item.random = Math.random());
          return (
            <RewardType
              key={item.random}
              domIndex={index}
              itemInfo={item}
              rewardPerson={rewardPerson}
              disabled={disabled}
            />
          );
        })}
        {disabled ? (
          <Fragment />
        ) : (
          <Button type="primary" onClick={() => this.addReward()}>
            新增奖励
          </Button>
        )}
      </Div>
    );
  }
}

export default connect(mapStateToProps)(RecipientInfo);

function mapStateToProps() {
  return {};
}
