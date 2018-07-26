/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-25 17:22:45
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 17:35:12
 * @Description:  拼接对象为请求字符串
 * @param {Object} obj - 待拼接的对象
 * @returns {string} - 拼接成的请求字符串
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
export function encodeSearchParams(obj) {
  const params = [];

  Object.keys(obj).forEach(key => {
    let value = obj[key];
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = '';
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='));
  });

  return params.join('&');
}
