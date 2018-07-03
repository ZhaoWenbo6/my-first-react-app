/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:47:41
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-02 17:53:18
 * @Description: 用户相关业务
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import { createPayloadAction } from '../utils/actionHelper';
import { USER_INFO, USER_TYPE } from '../reducer/user';
import { changeLoadingState } from './config';
import { getUser } from '../utils/api-service';

export function getUserInfo() {
  return (dispatch, getState) => {
    console.log(getState());
    getUser()
      .then(function(response) {
        dispatch(changeLoadingState(true));
        dispatch(createPayloadAction(USER_INFO, response.data.result));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}

export function changeUserType(str) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(USER_TYPE, str));
  };
}
