import { createPayloadAction } from '../../utils/actionHelper';
import {
  ACTIVITY_NAME,
  ACTIVITY_TYPE,
  START_TIME,
  END_TIME,
  ACTIVITY_SOURCE,
} from '../../reducer/ActivityManagement/baseInfo';

export function changeBaseInfo(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetBaseInfo() {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(changeBaseInfo(ACTIVITY_NAME, ''));
    dispatch(changeBaseInfo(ACTIVITY_TYPE, -1));
    dispatch(changeBaseInfo(START_TIME, 0));
    dispatch(changeBaseInfo(END_TIME, 0));
    dispatch(changeBaseInfo(ACTIVITY_SOURCE, 1));
  };
}
