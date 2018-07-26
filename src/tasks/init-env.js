/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 15:52:12
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 17:39:42
 * @Description: 根据注入的环境变量加载对应的环境变量文件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 */
import * as config from '../utils/config';
import _ from 'lodash';

export default context => {
  if (!process) {
    console.error('no process found please check your package.json config to ensure env is load');
  }
  let env = {};
  switch (_.get(process.env, 'DEPLOY_ENV', '')) {
    case 'master':
      env = config.master;
      break;
    case 'beta':
      env = config.beta;
      break;
    case 'dev':
      env = config.dev;
      break;
    default:
      console.log(`unknown deploy_env ${process.env.DEPLOY_ENV}`);
  }
  return Promise.resolve({ ...context, ...{ env } });
};
