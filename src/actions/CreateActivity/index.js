import { createPayloadAction } from '../../utils/actionHelper';
import { postCreateActivity } from '../../utils/api-service';

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
  } = stateObj;
  if (selectedType) {
    isDisable = skuFile.length > 0 || (isResponse && writeBizids.length > 0);
  } else {
    isDisable = data.length > 0;
  }
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
      },
      rewardInfo,
    } = getState().create;
    let params = {};
    const firstParams = splicFirstParameters(baseInfo);
    const thirdParams = splicThirdParameters(rewardInfo);
    switch (matchType) {
      case 1:
        if (selectedType === 0) {
          {
            bizIds: data.map(item => item.sku).join(',');
          }
          params = JSON.stringify({
            ...firstParams,
            matchType: matchType,
            bizIds: data.map(item => item.sku).join(','),
            ...thirdParams,
          });
        }
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
    const formData = new FormData();
    formData.append('activityInfo', `${params}`);
    dispatch(requestAddActivity(formData));
  };
}

// function splicTowerActivityParameters(params) {
//   return (dispatch, getState) => {
//     postCreateActivity(params);
//     dispatch(resetCreateState());
//     console.log(getState());
//   };
// }

export function requestAddActivity(params) {
  return (dispatch, getState) => {
    postCreateActivity(params).then(response => {
      console.log(response);
    });
    dispatch(resetCreateState());
    console.log(getState());
  };
}

export function resetCreateState(type, payload) {
  return (dispatch, getState) => {
    console.log(getState(type, payload));
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
