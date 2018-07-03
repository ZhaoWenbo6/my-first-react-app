/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 16:01:15
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-02 17:48:46
 * @Description: 注入环境变量，配置请求前缀
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 */
import * as api from '../utils/api-service';

export default context => {
  api.initRemote(context.env.shareService);
  return Promise.resolve({ ...context, ...{ api } });
};
