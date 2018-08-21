import { createPayloadAction } from '../../utils/actionHelper';
import _ from 'lodash';
import { getActivityList } from '../../utils/api-service';
import {
  SHARE_ACTIVITY_LINT,
  ACTIVITY_LIST_NAME,
  ACTIVITY_LIST_ID,
  TYPE,
  ACTIVITY_STATE,
  ACTIVITY_START_TIME,
  ACTIVITY_END_TIME,
  ACTIVITY_CREATER,
  ACTIVITY_LIST_TYPE,
  SHOP_ID,
  CID1_VALUE,
  CID2_VALUE,
  CID3_VALUE,
} from '../../reducer/ActivityList';
import { STRING_ZERO } from '../../consts/const';

export function changeActivityListValue(type, payload) {
  return dispatch => {
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetQueryFilter() {
  return dispatch => {
    dispatch(createPayloadAction(ACTIVITY_LIST_NAME, ''));
    dispatch(createPayloadAction(ACTIVITY_LIST_ID, ''));
    dispatch(createPayloadAction(TYPE, -1));
    dispatch(createPayloadAction(ACTIVITY_STATE, -1));
    dispatch(createPayloadAction(ACTIVITY_START_TIME, 0));
    dispatch(createPayloadAction(ACTIVITY_END_TIME, 0));
    dispatch(createPayloadAction(ACTIVITY_CREATER, ''));
    dispatch(createPayloadAction(ACTIVITY_LIST_TYPE, -1));
    dispatch(createPayloadAction(ACTIVITY_END_TIME, 0));
    dispatch(createPayloadAction(SHOP_ID, ''));
    dispatch(createPayloadAction(CID1_VALUE, '0')); //设置一级分类
    dispatch(createPayloadAction(CID2_VALUE, '0')); //恢复默认值
    dispatch(createPayloadAction(CID3_VALUE, '0')); //恢复默认值
  };
}

export function requestActivityListInfo(pageNo = 1, pageSize = 10) {
  return (dispatch, getState) => {
    const {
      activityListName,
      activityListId,
      type,
      activityState,
      activityStartTime,
      activityEndTime,
      activityCreater,
      activityListType,
      shopId,
      cid1Value,
      cid2Value,
      cid3Value,
    } = _.get(getState(), 'activityList', {});
    const params = {
      activityName: activityListName === '' ? null : activityListName,
      id: activityListId === '' ? null : activityListId,
      type: type === -1 ? null : type,
      status: activityState === -1 ? null : activityState,
      createStart: activityStartTime === 0 ? null : activityStartTime,
      createEnd: activityEndTime === 0 ? null : activityEndTime,
      creator: activityCreater === '' ? null : activityCreater,
      activityType: activityListType === -1 ? null : activityListType,
      shopId: shopId === '' ? null : shopId,
      cid1: cid1Value === STRING_ZERO ? null : cid1Value,
      cid2: cid2Value === STRING_ZERO ? null : cid2Value,
      cid3: cid3Value === STRING_ZERO ? null : cid3Value,
      pageNum: pageNo,
      pageSize: pageSize,
    };
    getActivityList(params).then(response => {
      const { status, data } = response;
      if (status === 200 && data.code === '0') {
        dispatch(createPayloadAction(SHARE_ACTIVITY_LINT, data.result));
      }
    });
  };
}
