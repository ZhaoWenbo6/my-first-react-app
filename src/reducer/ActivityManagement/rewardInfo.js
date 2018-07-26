/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-18 20:31:31
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-18 20:33:03
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';
import { MODULE_COUPON } from '../../consts/module';

export const SHARER_REWARDINFO = 'SHARER_REWARDINFO';
const sharerRewardInfo = handleAction(SHARER_REWARDINFO, returnPayload, [MODULE_COUPON]);

export const RECIPIENT_REWARDINFO = 'RECIPIENT_REWARDINFO';
const recipientRewardInfo = handleAction(RECIPIENT_REWARDINFO, returnPayload, []);

export const SHARE_REWARD_LIMIT = 'SHARE_REWARD_LIMIT';
const shareRewardLimit = handleAction(SHARE_REWARD_LIMIT, returnPayload, 0);

export const SHARE_REWARD_LIMIT_DAY = 'SHARE_REWARD_LIMIT_DAY';
const shareRewardLimitDay = handleAction(SHARE_REWARD_LIMIT_DAY, returnPayload, 0);

export const VIEW_REWARD_LIMIT = 'VIEW_REWARD_LIMIT';
const viewRewardLimit = handleAction(VIEW_REWARD_LIMIT, returnPayload, 0);

export const VIEW_REWARD_LIMIT_DAY = 'VIEW_REWARD_LIMIT_DAY';
const viewRewardLimitDay = handleAction(VIEW_REWARD_LIMIT_DAY, returnPayload, 0);

export default combineReducers({
  sharerRewardInfo,
  recipientRewardInfo,
  shareRewardLimit,
  shareRewardLimitDay,
  viewRewardLimit,
  viewRewardLimitDay,
});
