import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import RewardType from '../../../common/RewardType';
import { Button, message } from 'antd';
import { updateRewardInfo } from '../../../../actions/CreateActivity/rewardInfo';
// import { MODULE_COUPON } from '../../../../consts/module';

class SharerInfo extends Component {
  static displayName = 'SharerInfo';
  constructor(props) {
    super(props);
  }

  addReward = () => {
    const { dispatch, rewardPerson, sharerRewardInfo } = this.props;
    const module = {
      rewardPerson: 0, //奖励人：0:分享者，1:被分享者
      rewardType: 4, //奖励类型：1:优惠券，2:京豆，3:店铺积分,4:自营优惠券，5自营京豆
      couponId: '', //优惠券id/优惠券key
      prizeQuota: 0, //奖品总量
      prizeQuotaDay: 0, //每天发放奖品总量
      rewardRuleCategory: 0, //奖励规则：0，分享者分享完成；1，被分享者查看，3、分享者阶梯奖励，默认都是0
      couponName: '',
      couponNum: 0,
    };
    // delete test.random;
    if (sharerRewardInfo.length < 5) {
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

  checkButton = () => {
    let isDisable = true;
    const { sharerRewardInfo } = this.props;
    sharerRewardInfo.map(item => {
      if (item.rewardType === 4) {
        const { couponId, couponName, couponNum, prizeQuota, prizeQuotaDay } = item;
        isDisable =
          isDisable &&
          couponId !== '' &&
          couponName !== '' &&
          prizeQuota !== 0 &&
          prizeQuotaDay !== 0 &&
          couponNum >= prizeQuota &&
          prizeQuotaDay <= prizeQuota;
      } else if (item.rewardType === 5) {
        const {
          businessCode,
          callerCode,
          key,
          orgId,
          prizeQuotaTime,
          secondBusinessId,
          topBusinessId,
          JBeanNum,
        } = item;
        isDisable =
          isDisable &&
          businessCode !== '' &&
          callerCode !== '' &&
          key !== '' &&
          orgId !== '' &&
          secondBusinessId !== '' &&
          topBusinessId !== '' &&
          item.prizeQuota * prizeQuotaTime <= JBeanNum &&
          item.prizeQuota !== 0 &&
          item.prizeQuotaDay !== 0 &&
          prizeQuotaTime &&
          item.prizeQuota &&
          JBeanNum !== 0;
      }
    });
    return !isDisable;
  };

  render() {
    const isDisable = this.checkButton();
    const { sharerRewardInfo, disabled } = this.props;
    return (
      <Div>
        <h2>1.设置分享者信息</h2>
        {sharerRewardInfo.map((item, index) => {
          !item.random && (item.random = Math.random());
          return (
            <RewardType
              key={item.random}
              domIndex={index}
              itemInfo={item}
              rewardPerson={0}
              disabled={disabled}
              disabledJBean={
                sharerRewardInfo.filter(item => item.rewardType === 5).length > 0 ? true : false
              }
              disabledButton={sharerRewardInfo.length > 1 ? false : true}
            />
          );
        })}
        {disabled ? (
          <Fragment />
        ) : (
          <Button disabled={isDisable} type="primary" onClick={() => this.addReward()}>
            新增奖励
          </Button>
        )}
      </Div>
    );
  }
}

export default connect(mapStateToProps)(SharerInfo);

function mapStateToProps() {
  return {};
}
