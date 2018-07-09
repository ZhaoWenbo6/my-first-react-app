/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 16:30:36
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-05 16:30:36
 * @Description: reducer结构
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import user from './user';
import config from './config';
import create from './ActivityManagement';

export default {
  create: create,
  config: config,
  user: user,
};
