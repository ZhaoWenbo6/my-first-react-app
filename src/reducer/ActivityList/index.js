import { combineReducers } from 'redux';
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';

export const ACTIVITY_NAME = 'ACTIVITY_NAME';
const activityName = handleAction(ACTIVITY_NAME, returnPayload, '');

export const ACTIVITY_ID = 'ACTIVITY_ID';
const activityId = handleAction(ACTIVITY_ID, returnPayload, '');

export const ACTIVITY_TYPE = 'ACTIVITY_TYPE';
const activityType = handleAction(ACTIVITY_TYPE, returnPayload, -1);

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

export default combineReducers({
  activityName: activityName,
  activityId: activityId,
  activityType: activityType,
  activityState: activityState,
  activityStartTime: activityStartTime,
  activityEndTime: activityEndTime,
  activityCreater: activityCreater,
  shareActivityList: shareActivityList,
});
