export const MODULE_COUPON = {
  rewardPerson: 0, //奖励人：0:分享者，1:被分享者
  rewardType: 4, //奖励类型：1:优惠券，2:京豆，3:店铺积分,4:自营优惠券，5自营京豆
  couponId: '', //优惠券id/优惠券key
  prizeQuota: 1, //奖品总量
  prizeQuotaDay: 1, //每天发放奖品总量
  rewardRuleCategory: 0, //奖励规则：0，分享者分享完成；1，被分享者查看，3、分享者阶梯奖励，默认都是0
  couponName: '',
  couponNum: 0,
};

export const MODULE_JBEAN = {
  rewardPerson: 0, //奖励人：0:分享者，1:被分享者
  rewardType: 5, //奖励类型：1:优惠券，2:京豆，3:店铺积分,4:自营优惠券，5自营京豆
  prizeQuota: 1, //奖品总量
  prizeQuotaDay: 1, //每天发放奖品总量
  prizeQuotaTime: 1, //每次发放奖品量
  callerCode: '', //调用者编号
  key: '', //key
  businessCode: '', //业务编号
  topBusinessId: '', //一级业务编号
  secondBusinessId: '', //二级业务编号
  orgId: '', //机构号
  rewardRuleCategory: 0, //奖励规则：0，分享者分享完成；1，被分享者查看，3、分享者阶梯奖励，默认都是0
  JBeanNum: 0,
};
