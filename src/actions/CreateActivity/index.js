import { createPayloadAction } from '../../utils/actionHelper';
import { postCreateActivity } from '../../utils/api-service';
import { message } from 'antd';
import { ACTIVITY_LIST } from '../../consts/route';
import { CURRENT_STEP } from '../../reducer/ActivityManagement';
import { resetBaseInfo } from './baseInfo';
import { resetAddGoods } from './addGoods';
import { resetRewardInfo } from './rewardInfo';
import { resetQueryFilter } from '../ActivityList';

export function changeCurrentStep(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function checkFirstData(stateObj) {
  let isDisable = false;
  const { activityName, startTime, endTime } = stateObj;
  const boolActivityName = activityName !== '' && activityName.length <= 30;
  const boolActivityStartTime = startTime !== 0;
  const boolActivityEndTime = endTime !== 0;
  isDisable = boolActivityName && boolActivityStartTime && boolActivityEndTime;
  return isDisable;
}

export function checkSecondData(stateObj) {
  let isDisable = false;
  const {
    selectedType,
    selectedGoodsList: { data = [] },
    skuFile,
    writeBizids,
    isResponse,
    matchType,
    towerSkuFile,
    writeTowerBizids,
    isTowerResponse,
  } = stateObj;
  switch (matchType) {
    case 1:
      if (selectedType) {
        isDisable = skuFile.length > 0 || (isResponse && writeBizids.length > 0);
      } else {
        isDisable = data.length > 0;
      }
      break;
    case 4:
      isDisable = towerSkuFile.length > 0 && (isTowerResponse && writeTowerBizids.length > 0);
      break;
    default:
      break;
  }

  return isDisable;
}

export function checkThirdData(stateObj) {
  let isDisable = true;
  const {
    sharerRewardInfo,
    recipientRewardInfo,
    shareRewardLimit,
    shareRewardLimitDay,
    viewRewardLimit,
    viewRewardLimitDay,
  } = stateObj;
  const shareRewardLimitCount = [];
  const shareRewardLimitDayCount = [];
  const viewRewardLimitCount = [];
  const viewRewardLimitDayCount = [];
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
      shareRewardLimitCount.push(prizeQuota);
      shareRewardLimitDayCount.push(prizeQuotaDay);
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
      shareRewardLimitCount.push(item.prizeQuota);
      shareRewardLimitDayCount.push(item.prizeQuotaDay);
    }
  });
  recipientRewardInfo.map(item => {
    if (item.rewardType === 4) {
      const { couponId, couponName, couponNum, prizeQuota, prizeQuotaDay } = item;
      isDisable =
        isDisable &&
        couponId !== '' &&
        couponName !== '' &&
        prizeQuota !== 0 &&
        prizeQuotaDay !== 0 &&
        couponNum >= prizeQuota &&
        prizeQuotaDay <= prizeQuota &&
        viewRewardLimitCount.push(prizeQuota);
      viewRewardLimitDayCount.push(prizeQuotaDay);
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
      viewRewardLimitCount.push(item.prizeQuota);
      viewRewardLimitDayCount.push(item.prizeQuotaDay);
    }
  });
  isDisable =
    isDisable &&
    (shareRewardLimit
      ? shareRewardLimit <= shareRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
      : true) &&
    (shareRewardLimitDay
      ? shareRewardLimitDay <= shareRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
      : true) &&
    (viewRewardLimit
      ? viewRewardLimit <= viewRewardLimitCount.reduce((prev, next) => Math.max(prev, next))
      : true) &&
    (viewRewardLimitDay
      ? viewRewardLimitDay <= viewRewardLimitDayCount.reduce((prev, next) => Math.max(prev, next))
      : true);
  return isDisable;
}

export function splicCreateActivityParameters() {
  return (dispatch, getState) => {
    console.log(getState());
    const {
      baseInfo,
      addGoods: {
        matchType,
        selectedType,
        selectedGoodsList: { data },
        skuFile,
        writeBizids,
        towerSkuFile,
        writeTowerBizids,
      },
      rewardInfo,
    } = getState().create;
    let params = {};
    const formData = new FormData();
    const firstParams = splicFirstParameters(baseInfo);
    let secondParams = {};
    const thirdParams = splicThirdParameters(rewardInfo);
    switch (matchType) {
      case 1:
        if (selectedType === 0) {
          secondParams = {
            bizIds: data.map(item => item.sku).join(','),
          };
        } else {
          if (skuFile.length === 0) {
            secondParams = {
              bizIds: writeBizids,
            };
          } else {
            formData.append('skuFile', skuFile[0]);
          }
        }
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        secondParams = { bizIds: writeTowerBizids };
        formData.append('activityImge', towerSkuFile[0]);
        break;
      default:
        break;
    }
    params = JSON.stringify({
      matchType: matchType,
      ...firstParams,
      ...secondParams,
      ...thirdParams,
    });
    formData.append('activityInfo', `${params}`);
    dispatch(requestAddActivity(formData));
  };
}

export function requestAddActivity(params) {
  return (dispatch, getState) => {
    const {
      config: { routeHistory },
    } = getState();
    postCreateActivity(params).then(response => {
      const {
        status,
        data: { code, message: responseMessage },
      } = response;
      if (status === 200) {
        if (code === '0') {
          message.success('活动创建成功');
          dispatch(resetCreateState());
          dispatch(resetQueryFilter());
          routeHistory.push(ACTIVITY_LIST);
        } else {
          message.error(responseMessage);
        }
      } else {
        message.error(`请求异常：状态码为${status}`);
      }
      console.log(response);
    });
    console.log(getState());
  };
}

export function resetCreateState() {
  return dispatch => {
    dispatch(changeCurrentStep(CURRENT_STEP, -1));
    dispatch(resetBaseInfo());
    dispatch(resetAddGoods());
    dispatch(resetRewardInfo());
  };
}

function splicFirstParameters(baseInfo = {}) {
  const { activityName, activityType, activitySource, startTime, endTime } = baseInfo;
  return {
    activityName: activityName,
    type: activityType,
    source: activitySource,
    startDate: startTime,
    endDate: endTime,
  };
}

function splicThirdParameters(rewardInfo = {}) {
  const {
    shareRewardLimit,
    shareRewardLimitDay,
    viewRewardLimit,
    viewRewardLimitDay,
    sharerRewardInfo,
    recipientRewardInfo,
  } = rewardInfo;
  const shareRuleList = [
    ...splicShareReward(sharerRewardInfo),
    ...splicShareReward(recipientRewardInfo),
  ];
  return {
    shareRewardLimit: shareRewardLimit,
    shareRewardLimitDay: shareRewardLimitDay,
    viewRewardLimit: viewRewardLimit,
    viewRewardLimitDay: viewRewardLimitDay,
    shareRuleList: shareRuleList,
  };
}

function splicShareReward(sharerRewardInfo) {
  return sharerRewardInfo.map(item => {
    switch (item.rewardType) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        return {
          couponId: item.couponId,
          rewardPerson: item.rewardPerson,
          rewardRuleCategory: item.rewardRuleCategory,
          rewardType: item.rewardType,
          prizeQuota: item.prizeQuota,
          prizeQuotaDay: item.prizeQuotaDay,
        };
      case 5:
        return {
          rewardPerson: item.rewardPerson,
          rewardRuleCategory: item.rewardRuleCategory,
          rewardType: item.rewardType,
          prizeQuota: item.prizeQuota,
          prizeQuotaDay: item.prizeQuotaDay,
          prizeQuotaTime: item.prizeQuotaTime,
          callerCode: item.callerCode,
          key: item.key,
          businessCode: item.businessCode,
          topBusinessId: item.topBusinessId,
          secondBusinessId: item.secondBusinessId,
          orgId: item.orgId,
        };
      default:
        break;
    }
  });
}
