import { createPayloadAction } from '../../utils/actionHelper';
import _ from 'lodash';
import {
  SHARER_REWARDINFO,
  RECIPIENT_REWARDINFO,
  SHARE_REWARD_LIMIT,
  SHARE_REWARD_LIMIT_DAY,
  VIEW_REWARD_LIMIT,
  VIEW_REWARD_LIMIT_DAY,
} from '../../reducer/ActivityManagement/rewardInfo';
import { REWARD_PERSON_SHARER, INT_ZERO, OBJECT_EMPTY } from '../../consts/const';
import { MODULE_COUPON } from '../../consts/module';

export function changeRewardInfo(type, payload) {
  return dispatch => {
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetRewardInfo() {
  return dispatch => {
    dispatch(createPayloadAction(SHARER_REWARDINFO, [MODULE_COUPON]));
    dispatch(createPayloadAction(RECIPIENT_REWARDINFO, []));
    dispatch(createPayloadAction(SHARE_REWARD_LIMIT, 0));
    dispatch(createPayloadAction(SHARE_REWARD_LIMIT_DAY, 0));
    dispatch(createPayloadAction(VIEW_REWARD_LIMIT, 0));
    dispatch(createPayloadAction(VIEW_REWARD_LIMIT_DAY, 0));
  };
}

export function updateRewardInfo({
  rewardPerson = REWARD_PERSON_SHARER,
  domIndex = INT_ZERO,
  updateList = OBJECT_EMPTY,
  option = '',
}) {
  return (dispatch, getState) => {
    const { sharerRewardInfo, recipientRewardInfo } = _.get(getState(), 'create.rewardInfo');
    const resultList = rewardPerson === 0 ? sharerRewardInfo : recipientRewardInfo;
    const actionType = rewardPerson === 0 ? SHARER_REWARDINFO : RECIPIENT_REWARDINFO;
    switch (option) {
      case 'add':
        resultList.push(updateList);
        break;
      case 'delete':
        resultList.splice(domIndex, 1);
        break;
      case 'update':
        resultList.splice(domIndex, 1, updateList);
        break;
      default:
        break;
    }
    dispatch(changeRewardInfo(actionType, [...resultList]));
  };
}
