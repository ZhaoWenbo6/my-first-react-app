/*
 * @Author: Wenbo Zhao
 * @Date: 2018-06-27 11:22:12
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:51:11
 * @Description: 路由变量的集合，避免魔法数字
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 */

// 默认
export const DEFAULT_ROUTE = '/index.do';

// 活动管理
export const ACTIVITY_MANAGEMENT = `${DEFAULT_ROUTE}/ActivityManagement`;

export const ACTIVITY_DETAILS = `${ACTIVITY_MANAGEMENT}/ActivityDetails`;

export const ACTIVITY_LIST = `${ACTIVITY_MANAGEMENT}/ActivityList`;

export const CREATE_ACTIVITY = `${ACTIVITY_MANAGEMENT}/CreateActivity`;
export const BASE_INFO = `${CREATE_ACTIVITY}/BaseInfo`;
export const ADD_GOODS = `${CREATE_ACTIVITY}/AddGoods`;
export const SET_REWARDS = `${CREATE_ACTIVITY}/SetRewards`;
export const ACTIVITY_PREVIEW = `${CREATE_ACTIVITY}/ActivityPreview`;

// 数据看板
export const DATA_BOARD = `${DEFAULT_ROUTE}/DateBoard`;
export const VIEW_DATA_BY_ACTIVITY = `${DATA_BOARD}/ViewDataByActivity`;
export const VIEW_DATA_BY_DAY = `${DATA_BOARD}/ViewDataByDay`;

// 活动语管理
export const ACTIVITY_TEXT_MANAGEMENT = `${DEFAULT_ROUTE}/ActivityTextManagement`;
export const ACTIVITY_TEXT_LIST = `${ACTIVITY_TEXT_MANAGEMENT}/ActivityTextList`;
export const NEW_ACTIVITY_TEXT = `${ACTIVITY_TEXT_MANAGEMENT}/NewActivityText`;
