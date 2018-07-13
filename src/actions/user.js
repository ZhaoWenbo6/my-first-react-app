/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:47:41
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-05 16:47:02
 * @Description: 用户相关业务
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import { createPayloadAction } from '../utils/actionHelper';
import { USER_INFO, USER_TYPE } from '../reducer/user';
import { changeLoadingState } from './config';

export function getUserInfo() {
  return (dispatch, getState) => {
    console.log(getState(), USER_INFO);
    let getCookie = '';
    // if (process.env.DEPLOY_ENV === 'dev') {
    //   document.cookie =
    //     'sso.jd.com=f15d9e1dca6f4db4add37c4f4463af88; user_inf=%7B%22code%22%3A%220%22%2C%22message%22%3A%22%E5%93%8D%E5%BA%94%E6%88%90%E5%8A%9F%22%2C%22result%22%3A%7B%22higher%22%3A%7B%22higher%22%3A%7B%22erp%22%3A%22bjhechao%22%2C%22level%22%3A1%2C%22name%22%3A%22%E4%BD%95%E8%B6%85%22%7D%2C%22erp%22%3A%22bjzhaixueduo%22%2C%22level%22%3A1%2C%22name%22%3A%22%E7%BF%9F%E5%AD%A6%E5%A4%9A%22%7D%2C%22erp%22%3A%22bjczjing%22%2C%22level%22%3A1%2C%22name%22%3A%22%E5%B4%94%E5%85%86%E9%9D%99%22%7D%7D';
    // }
    getCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user_inf\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    let parseCookie = {};
    if (getCookie.length !== 0) {
      parseCookie = JSON.parse(decodeURIComponent(getCookie));
      dispatch(createPayloadAction(USER_INFO, parseCookie));
      dispatch(changeLoadingState(true));
    }
  };
}

export function changeUserType(str) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(USER_TYPE, str));
  };
}
