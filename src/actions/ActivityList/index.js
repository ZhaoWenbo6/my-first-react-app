import { createPayloadAction } from '../../utils/actionHelper';
import _ from 'lodash';
import { getActivityList } from '../../utils/api-service';
import {
  SHARE_ACTIVITY_LINT,
  ACTIVITY_NAME,
  ACTIVITY_ID,
  ACTIVITY_TYPE,
  ACTIVITY_STATE,
  ACTIVITY_START_TIME,
  ACTIVITY_END_TIME,
  ACTIVITY_CREATER,
} from '../../reducer/ActivityList';

export function changeActivityListValue(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetQueryFilter() {
  return dispatch => {
    dispatch(createPayloadAction(ACTIVITY_NAME, ''));
    dispatch(createPayloadAction(ACTIVITY_ID, ''));
    dispatch(createPayloadAction(ACTIVITY_TYPE, -1));
    dispatch(createPayloadAction(ACTIVITY_STATE, -1));
    dispatch(createPayloadAction(ACTIVITY_START_TIME, 0));
    dispatch(createPayloadAction(ACTIVITY_END_TIME, 0));
    dispatch(createPayloadAction(ACTIVITY_CREATER, ''));
  };
}

export function requestActivityListInfo(pageNo = 1, pageSize = 10) {
  return (dispatch, getState) => {
    console.log(getState());
    const {
      activityName,
      activityId,
      activityType,
      activityState,
      activityStartTime,
      activityEndTime,
      activityCreater,
    } = _.get(getState(), 'activityList', {});
    const params = {
      activityName: activityName === '' ? null : activityName,
      id: activityId === '' ? null : activityId,
      type: activityType === -1 ? null : activityType,
      status: activityState === -1 ? null : activityState,
      createStart: activityStartTime === 0 ? null : activityStartTime,
      createEnd: activityEndTime === 0 ? null : activityEndTime,
      creator: activityCreater === '' ? null : activityCreater,
      pageNum: pageNo,
      pageSize: pageSize,
    };
    getActivityList(params).then(response => {
      const { status, data } = response;
      if (status === 200 && data.code === '0') {
        dispatch(createPayloadAction(SHARE_ACTIVITY_LINT, data.result));
      }
      console.log(response);
    });
  };
}
