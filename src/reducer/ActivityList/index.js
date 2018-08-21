import { combineReducers } from 'redux';
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';

export const ACTIVITY_LIST_NAME = 'ACTIVITY_LIST_NAME';
const activityListName = handleAction(ACTIVITY_LIST_NAME, returnPayload, '');

export const ACTIVITY_LIST_ID = 'ACTIVITY_LIST_ID';
const activityListId = handleAction(ACTIVITY_LIST_ID, returnPayload, '');

export const TYPE = 'TYPE';
const type = handleAction(TYPE, returnPayload, -1);

export const ACTIVITY_STATE = 'ACTIVITY_STATE';
const activityState = handleAction(ACTIVITY_STATE, returnPayload, -1);

export const ACTIVITY_START_TIME = 'ACTIVITY_START_TIME';
const activityStartTime = handleAction(ACTIVITY_START_TIME, returnPayload, 0);

export const ACTIVITY_END_TIME = 'ACTIVITY_END_TIME';
const activityEndTime = handleAction(ACTIVITY_END_TIME, returnPayload, 0);

export const ACTIVITY_CREATER = 'ACTIVITY_CREATER';
const activityCreater = handleAction(ACTIVITY_CREATER, returnPayload, '');

export const SHARE_ACTIVITY_LINT = 'SHARE_ACTIVITY_LINT';
const shareActivityList = handleAction(SHARE_ACTIVITY_LINT, returnPayload, []);

export const SHOP_ID = 'SHOP_ID';
const shopId = handleAction(SHOP_ID, returnPayload, '');

export const ACTIVITY_LIST_TYPE = 'ACTIVITY_LIST_TYPE';
const activityListType = handleAction(ACTIVITY_LIST_TYPE, returnPayload, -1);

export const CID1 = 'CID1';
const cid1 = handleAction(CID1, returnPayload, []);

export const CID2 = 'CID2';
const cid2 = handleAction(CID2, returnPayload, []);

export const CID3 = 'CID3';
const cid3 = handleAction(CID3, returnPayload, []);

export const CID1_VALUE = 'CID1_VALUE';
const cid1Value = handleAction(CID1_VALUE, returnPayload, '0');

export const CID2_VALUE = 'CID2_VALUE';
const cid2Value = handleAction(CID2_VALUE, returnPayload, '0');

export const CID3_VALUE = 'CID3_VALUE';
const cid3Value = handleAction(CID3_VALUE, returnPayload, '0');

export default combineReducers({
  activityListName: activityListName,
  activityListId: activityListId,
  type: type,
  activityState: activityState,
  activityStartTime: activityStartTime,
  activityEndTime: activityEndTime,
  activityCreater: activityCreater,
  shareActivityList: shareActivityList,
  shopId: shopId,
  activityListType: activityListType,
  cid1: cid1,
  cid2: cid2,
  cid3: cid3,
  cid1Value: cid1Value,
  cid2Value: cid2Value,
  cid3Value: cid3Value,
});
