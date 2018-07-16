/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-04 17:43:11
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:42
 * @Description: 创建活动第一步的reducer
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';

export const ACTIVITY_NAME = 'ACTIVITY_NAME';
const activityName = handleAction(ACTIVITY_NAME, returnPayload, '');

export const ACTIVITY_TYPE = 'ACTIVITY_TYPE';
const activityType = handleAction(ACTIVITY_TYPE, returnPayload, 1);

export const ACTIVITY_START_TIME = 'ACTIVITY_START_TIME';
const activityStartTime = handleAction(ACTIVITY_START_TIME, returnPayload, '');

export const ACTIVITY_END_TIME = 'ACTIVITY_END_TIME';
const activityEndTime = handleAction(ACTIVITY_END_TIME, returnPayload, '');

export const ACTIVITY_SOURCE = 'ACTIVITY_SOURCE';
const activitySource = handleAction(ACTIVITY_SOURCE, returnPayload, 1);
// const room = createPayloadReducer('room');

export default combineReducers({
  activityName,
  activityType,
  activityStartTime,
  activityEndTime,
  activitySource,
});
