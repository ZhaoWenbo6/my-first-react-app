/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-16 16:46:25
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:58:09
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import {
  API_USER_INFO,
  CLASSIFICATION,
  GOODSLIST,
  CHECK_SKU,
  CHECK_JBEAN,
  CHECK_COUPON,
  CHECK_TOWER,
  ADD_ACTIVITY,
  QUERY_ACTIVITY,
  CLOSE_ACTIVITY,
  ACTIVITY_DETAILS,
  UPDATE_CHECK_FLOW,
} from '../consts/api';

export function user() {
  return () => ({
    method: 'get',
    path: API_USER_INFO,
  });
}

export function classification(params) {
  return () => ({
    method: 'get',
    path: CLASSIFICATION,
    params: params,
  });
}

export function goodsList(params) {
  return () => ({
    method: 'post',
    path: GOODSLIST,
    payload: params,
  });
}

export function skuId(params) {
  return () => ({
    method: 'post',
    path: CHECK_SKU,
    payload: params,
  });
}

export function jBean(params) {
  return () => ({
    method: 'post',
    path: CHECK_JBEAN,
    payload: params,
  });
}

export function coupon(params) {
  return () => ({
    method: 'post',
    path: CHECK_COUPON,
    payload: params,
  });
}

export function tower(params) {
  return () => ({
    method: 'post',
    path: CHECK_TOWER,
    payload: params,
  });
}

export function createActivity(params) {
  return () => ({
    method: 'post',
    path: ADD_ACTIVITY,
    payload: params,
  });
}

export function activityList(params) {
  return () => ({
    method: 'get',
    path: QUERY_ACTIVITY,
    params: params,
  });
}

export function closeActivity(params) {
  return () => ({
    method: 'get',
    path: CLOSE_ACTIVITY,
    params: params,
  });
}

export function activityDetails(params) {
  return () => ({
    method: 'get',
    path: ACTIVITY_DETAILS,
    params: params,
  });
}

export function checkFlow(params) {
  return () => ({
    method: 'get',
    path: UPDATE_CHECK_FLOW,
    params: params,
  });
}
