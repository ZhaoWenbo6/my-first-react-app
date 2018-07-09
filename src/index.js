/*
 * @Author: Wenbo Zhao
 * @Date: 2018-06-06 17:35:45
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-06-06 17:36:05
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @youWant: 
 */
import reducePromise from './utils/reducePromise';
import tasks from './tasks';
// registerServiceWorker();

reducePromise(tasks, {});

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    console.error('hiot');
  });
}
