/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 16:30:36
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:45
 * @Description: reducer结构
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import user from './user';
import config from './config';
import create from './ActivityManagement';
import activityList from './ActivityList';
import ActivityDetails from './ActivityDetails';

export default {
  create: create,
  config: config,
  user: user,
  activityList: activityList,
  activityDetails: ActivityDetails,
};
