import { createPayloadAction } from '../utils/actionHelper';
import { IS_APP_READY, ROUTE_HISTORY } from '../reducer/config';

export function changeConfigInfo(type, value) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, value));
  };
}

export function changeLoadingState(bool) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(IS_APP_READY, bool));
  };
}

export function changeRouteHistory(history) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(ROUTE_HISTORY, history));
  };
}
