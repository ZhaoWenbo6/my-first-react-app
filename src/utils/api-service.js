/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:57:16
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-02 17:59:49
 * @Description: 统一接口函数
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import axios from 'axios';
import * as apiSchema from './api-schema';

let shareService;
export function initRemote(serviceUrl = '') {
  shareService = axios.create({
    baseURL: serviceUrl,
    timeout: 10000,
    headers: {
      accept: 'application/vnd.api+json',
    },
  });
}

function makeService(service, api = {}) {
  // todo cache support and connect to redux state
  return service.request({
    url: api.path,
    method: api.method,
    data: api.payload,
    headers: { ...service.defaults.headers },
  });
}

export function getUser() {
  return makeService(shareService, apiSchema.user()());
}
