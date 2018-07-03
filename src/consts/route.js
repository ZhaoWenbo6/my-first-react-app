/*
 * @Author: Wenbo Zhao
 * @Date: 2018-06-27 11:22:12
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-06-27 15:30:18
 * @Description: 路由变量的集合，避免魔法数字
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 */

// 默认
export const DEFAULT_ROUTE = '/';

// 活动管理
export const ACTIVITY_MANAGEMENT = '/ActivityManagement';
export const ACTIVITY_DETAILS = `${ACTIVITY_MANAGEMENT}/ActivityDetails`;
export const ACTIVITY_LIST = `${ACTIVITY_MANAGEMENT}/ActivityList`;
export const CREATE_ACTIVITY = `${ACTIVITY_MANAGEMENT}/CreateActivity`;

// 数据看板
export const DATA_BOARD = '/DateBoard';
export const VIEW_DATA_BY_ACTIVITY = `${DATA_BOARD}/ViewDataByActivity`;
export const VIEW_DATA_BY_DAY = `${DATA_BOARD}/ViewDataByDay`;

// 活动语管理
export const ACTIVITY_TEXT_MANAGEMENT = '/ActivityTextManagement';
export const ACTIVITY_TEXT_LIST = `${ACTIVITY_TEXT_MANAGEMENT}/ActivityTextList`;
export const NEW_ACTIVITY_TEXT = `${ACTIVITY_TEXT_MANAGEMENT}/NewActivityText`;
