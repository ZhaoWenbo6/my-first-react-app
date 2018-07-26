/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 17:30:14
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:49:11
 * @Description: 针对styled-component编写公共的样式
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 * !!!!!!: 注意字符串内结尾的分号 ';' !!!!!!
 */

// Flex布局
export const FLEX_CENTER_CENTER = 'display:flex; justify-content: center; align-items: center;';
export const FLEX_BETWEEN_CENTER =
  'display:flex; justify-content: space-between; align-items: center;';
export const FLEX_START_CENTER = 'display:flex; justify-content: flex-start; align-items: center;';
export const FLEX_SPACEAROUND_CENTER = `display: flex;
                                        align-items: center;
                                        justify-content: space-around;`;

export const FLEX_COL_END_START =
  'display: flex; flex-direction: column; justify-content: flex-end; align-items: flex-start;';
export const FLEX_COL_CENTER_START =
  'display: flex; flex-direction: column; justify-content: center; align-items: flex-start;';

export const FLEX_WRAP = 'flex-wrap: wrap;';

// margin
export const MARGIN_TEN = 'margin: 10px';
export const MARGIN_TEN_ZERO = 'margin: 10px 0';
export const MARGIN_ZERP_TEN_TEN_TEN = 'margin: 0 10px 10px';

export const MARGIN_RIGHT_TEN = 'margin-right: 10px';

export const SINGLE_LINE_OMITTED = `overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;`;
