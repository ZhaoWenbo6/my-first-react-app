/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-04 18:00:04
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:40
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';

export const GOODS_NAME = 'GOODS_NAME';
const goodsName = handleAction(GOODS_NAME, returnPayload, {});

export default combineReducers({
  goodsName,
});
