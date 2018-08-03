/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-02 17:54:40
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:57:49
 * @Description: 接口请求后缀常量
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

export const RESPONSE_CODE_ZERO = '0';
export const RESPONSE_CODE_ONE = '1';
export const RESPONSE_CODE_TWO = '2';
export const RESPONSE_CODE_THREE = '3';
export const RESPONSE_CODE_FOUR = '4';
export const RESPONSE_CODE_FIVE = '5';
export const RESPONSE_CODE_SIX = '6';
export const RESPONSE_CODE_MINUS_ONE = '-1';

export const PREFIX_RUL_DEV = 'http://bjshare.cms.jd.care';
export const PREFIX_RUL_PRD = 'http://bjshare.cms.jd.local';

export const API_DEFAULT = '/mock/5b320f940a29144fd436edf9';

export const API_USER_INFO = `${API_DEFAULT}/getUserInfo`;

export const GET_USER_INFO = '/usersInfo.do';
export const GET_LOGOUT = '/loginOut.do';

export const CREATE_PREFIXES = '/selfProduce'; //创建活动部分
export const CLASSIFICATION = `${CREATE_PREFIXES}/selectByParentCode.do`; //商品分类
export const GOODSLIST = `${CREATE_PREFIXES}/queryList.do`; //商品列表

export const CHECK = '/validate'; //校验
export const CHECK_SKU = `${CHECK}/sku.do`; //sku
export const TOWER_SKU_ID = `${CHECK}/tongtianactivity.do`; //通天塔sku
export const CHECK_JBEAN = `${CHECK}/jingbeanpool.do`; //京豆
export const CHECK_COUPON = `${CHECK}/coupon.do`; //优惠券
export const CHECK_TOWER = `${CHECK}/tongtianactivity.do`; //通天塔

export const ACTIVITY = '/activity'; //活动部分
export const ADD_ACTIVITY = `${ACTIVITY}/addActivity.do`; //增加活动
export const QUERY_ACTIVITY = `${ACTIVITY}/queryActivityList.do`; //查询活动列表
export const CLOSE_ACTIVITY = `${ACTIVITY}/closeActivity.do`; //关闭活动
export const ACTIVITY_DETAILS = `${ACTIVITY}/getActivityInfo.do`; //关闭活动

export const EXPORT = '/export'; //活动详情导出数据
export const ACTIVITY_DETAILS_EXPORT = `${EXPORT}/excelThingIdsList.do`; //活动详情导出数据

export const CHECK_FLOW = '/checkFlowActivity'; //活动详情导出数据
export const UPDATE_CHECK_FLOW = `${CHECK_FLOW}/updateCheckFlow.do`; //活动详情导出数据
