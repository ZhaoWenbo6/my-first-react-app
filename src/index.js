/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-03 11:09:47
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-03 11:09:47
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import reducePromise from './utils/reducePromise';
import tasks from './tasks';

reducePromise(tasks, {});

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    console.error('hiot');
  });
}
