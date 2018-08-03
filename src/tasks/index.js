/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:03:37
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-02 17:51:53
 * @Description: 初始化过程
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 */
import initStore from './init-store';
import initUI from './init-ui';
import initEnv from './init-env';
import initApi from './init-api';

export default [initEnv, initApi, initStore, initUI];
