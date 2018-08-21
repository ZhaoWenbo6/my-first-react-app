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
  return dispatch => {
    dispatch(requsetUserInfo());
  };
}

export function changeUserType(str) {
  return dispatch => {
    dispatch(createPayloadAction(USER_TYPE, str));
  };
}

export function requsetUserInfo() {
  return dispatch => {
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
