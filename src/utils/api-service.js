/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:57:16
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:56:11
 * @Description: 统一接口函数
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import axios from 'axios';
import * as apiSchema from './api-schema';
import { LOGOUT_PAGE } from '../consts/url';

let shareService;
export function initRemote(serviceUrl = '') {
  shareService = axios.create({
    baseURL: serviceUrl,
    timeout: 10000,
    withCredentials: process.env.DEPLOY_ENV === 'dev' ? true : false,
    headers: {
      accept: 'application/vnd.api+json',
    },
  });

  // 添加响应拦截器
  shareService.interceptors.response.use(
    function(response) {
      // api请求302重定向处理，重定向api返回的data是登陆页面的代码
      const { data, status } = response;
      if (status === 200 && typeof data === 'object') {
        return response;
      } else {
        window.location.href = LOGOUT_PAGE;
      }
      return response;
    },
    function(error) {
      // 异常处理
      window.location.href = LOGOUT_PAGE;
      return Promise.reject(error);
    }
  );
}

function makeService(service, api = {}) {
  // todo cache support and connect to redux state
  return service.request({
    url: api.path,
    method: api.method,
    data: api.payload,
    params: api.params,
    headers: { ...service.defaults.headers },
  });
}

export function getUser() {
  return makeService(shareService, apiSchema.user()());
}

export function logout() {
  return makeService(shareService, apiSchema.logout()());
}

export function getClassification(params) {
  return makeService(shareService, apiSchema.classification(params)());
}

export function getGoodsList(params) {
  return makeService(shareService, apiSchema.goodsList(params)());
}

export function checkSkuId(params) {
  return makeService(shareService, apiSchema.skuId(params)());
}

export function checkTowerSkuId(params) {
  return makeService(shareService, apiSchema.towerSkuId(params)());
}

export function checkJBean(params) {
  return makeService(shareService, apiSchema.jBean(params)());
}

export function checkCoupon(params) {
  return makeService(shareService, apiSchema.coupon(params)());
}

export function checkTower(params) {
  return makeService(shareService, apiSchema.tower(params)());
}

export function postCreateActivity(params) {
  return makeService(shareService, apiSchema.createActivity(params)());
}

export function getActivityList(params) {
  return makeService(shareService, apiSchema.activityList(params)());
}

export function closeActivity(params) {
  return makeService(shareService, apiSchema.closeActivity(params)());
}

export function getActivityDetails(params) {
  return makeService(shareService, apiSchema.activityDetails(params)());
}

export function submitCheckFlow(params) {
  return makeService(shareService, apiSchema.checkFlow(params)());
}
