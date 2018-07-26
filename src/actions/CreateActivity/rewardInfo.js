import { createPayloadAction } from '../../utils/actionHelper';
import _ from 'lodash';
import {
  SHARER_REWARDINFO,
  RECIPIENT_REWARDINFO,
} from '../../reducer/ActivityManagement/rewardInfo';
import { REWARD_PERSON_SHARER, INT_ZERO, OBJECT_EMPTY } from '../../consts/const';

export function changeRewardInfo(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function updateRewardInfo({
  rewardPerson = REWARD_PERSON_SHARER,
  domIndex = INT_ZERO,
  updateList = OBJECT_EMPTY,
  option = '',
}) {
  return (dispatch, getState) => {
    console.log(getState());
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
