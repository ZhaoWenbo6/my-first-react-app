/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-04 17:43:11
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-18 20:33:04
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

export const START_TIME = 'START_TIME';
const startTime = handleAction(START_TIME, returnPayload, 0);

export const END_TIME = 'END_TIME';
const endTime = handleAction(END_TIME, returnPayload, 0);

export const ACTIVITY_SOURCE = 'ACTIVITY_SOURCE';
const activitySource = handleAction(ACTIVITY_SOURCE, returnPayload, 1);

export default combineReducers({
  activityName,
  activityType,
  startTime,
  endTime,
  activitySource,
});
