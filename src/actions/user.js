/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:47:41
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:20
 * @Description: 用户相关业务
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import { createPayloadAction } from '../utils/actionHelper';
import { USER_INFO, USER_TYPE } from '../reducer/user';
import { changeLoadingState } from './config';
import { LOGOUT_PAGE } from '../consts/url';
import { message } from 'antd';
import { getUser } from '../utils/api-service';

export function getUserInfo() {
  return (dispatch, getState) => {
    console.log(getState(), USER_INFO);
    // let getCookie = '';
    // getCookie = document.cookie.replace(/(?:(?:^|.*;\s*)user_inf\s*\=\s*([^;]*).*$)|^.*$/, '$1');
    // let parseCookie = {};
    // if (getCookie.length !== 0) {
    //   parseCookie = JSON.parse(decodeURIComponent(getCookie));
    //   //验证身份，系统异常跳到登录页
    //   if (parseCookie.code === '0') {
    //     dispatch(createPayloadAction(USER_INFO, parseCookie));
    //     dispatch(changeLoadingState(true));
    //   } else {
    //     message.error(parseCookie.message);
    //     setTimeout(() => window.open(LOGOUT_PAGE, '_self'), 2000);
    //   }
    // } else {
    dispatch(requsetUserInfo());
    // }
  };
}

export function changeUserType(str) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(USER_TYPE, str));
  };
}

export function requsetUserInfo() {
  return (dispatch, getState) => {
    console.log(getState());
    getUser().then(response => {
      const {
        data,
        data: { code, result, message: responseMessage },
      } = response;
      if (response.status === 200 && code === '0') {
        document.cookie = `user_inf=${encodeURIComponent(JSON.stringify(data))}`;
        dispatch(createPayloadAction(USER_INFO, result));
        dispatch(changeLoadingState(true));
      } else {
        message.error(responseMessage);
        dispatch(changeLoadingState(false));
        setTimeout(() => window.open(LOGOUT_PAGE, '_self'), 2000);
      }
    });
  };
}
