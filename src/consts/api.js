/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:54:40
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 15:18:09
 * @Description: 接口请求后缀常量
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

export const API_DEFAULT = '/mock/5b320f940a29144fd436edf9';

export const API_USER_INFO = `${API_DEFAULT}/getUserInfo`;

export const CREATE_PREFIXES = '/selfProduce'; //创建活动
export const CLASSIFICATION = `${CREATE_PREFIXES}/selectByParentCode.do`; //获取商品分类
export const GOODSLIST = `${CREATE_PREFIXES}/queryList.do`; //获取商品列表
