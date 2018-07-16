/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:26:09
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:44
 * @Description: 创建活动树结构
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { combineReducers } from 'redux';
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import baseInfo from './baseInfo';
import addGoods from './addGoods';

export const CURRENT_STEP = 'CURRENT_STEP';
const currentStep = handleAction(CURRENT_STEP, returnPayload, -1);

export default combineReducers({
  currentStep: currentStep,
  baseInfo: baseInfo,
  addGoods: addGoods,
});
