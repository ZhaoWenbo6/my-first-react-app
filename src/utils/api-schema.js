/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-16 16:46:25
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 16:46:25
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { API_USER_INFO, CLASSIFICATION, GOODSLIST } from '../consts/api';

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
