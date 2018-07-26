/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-04 18:00:04
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 17:22:25
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';

export const MATCH_TYPE = 'MATCH_TYPE';
const matchType = handleAction(MATCH_TYPE, returnPayload, 1);

export const GOODS_LIST_OBJECT = 'GOODS_LIST_OBJECT';
const goodsListObject = handleAction(GOODS_LIST_OBJECT, returnPayload, {});

export const SELECTED_GOODS_LIST = 'SELECTED_GOODS_LIST';
const selectedGoodsList = handleAction(SELECTED_GOODS_LIST, returnPayload, {});

export const GOODS_NAME = 'GOODS_NAME';
const goodsName = handleAction(GOODS_NAME, returnPayload, '');

export const GOODS_FIRST_CLASSIFICATION = 'GOODS_FIRST_CLASSIFICATION';
const goodsFirstClassification = handleAction(GOODS_FIRST_CLASSIFICATION, returnPayload, []);

export const GOODS_SECOND_CLASSIFICATION = 'GOODS_SECOND_CLASSIFICATION';
const goodsSecondClassification = handleAction(GOODS_SECOND_CLASSIFICATION, returnPayload, []);

export const GOODS_THIRD_CLASSIFICATION = 'GOODS_THIRD_CLASSIFICATION';
const goodsThirdClassification = handleAction(GOODS_THIRD_CLASSIFICATION, returnPayload, []);

export const FIRST_CLASSIFICATION = 'FIRST_CLASSIFICATION';
const firstClassification = handleAction(FIRST_CLASSIFICATION, returnPayload, '0');

export const SECOND_CLASSIFICATION = 'SECOND_CLASSIFICATION';
const secondClassification = handleAction(SECOND_CLASSIFICATION, returnPayload, '0');

export const THIRD_CLASSIFICATION = 'THIRD_CLASSIFICATION';
const thirdClassification = handleAction(THIRD_CLASSIFICATION, returnPayload, '0');

export const SELECTED_TYPE = 'SELECTED_TYPE';
const selectedType = handleAction(SELECTED_TYPE, returnPayload, 0);

export const WRITE_BIZIDS = 'WRITE_BIZIDS';
const writeBizids = handleAction(WRITE_BIZIDS, returnPayload, '');

export default combineReducers({
  matchType,
  goodsListObject,
  selectedGoodsList,
  goodsName,
  goodsFirstClassification,
  goodsSecondClassification,
  goodsThirdClassification,
  firstClassification,
  secondClassification,
  thirdClassification,
  selectedType,
  writeBizids,
});
