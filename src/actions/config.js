import { createPayloadAction } from '../utils/actionHelper';
import { IS_APP_READY, ROUTE_HISTORY } from '../reducer/config';

export function changeConfigInfo(type, value) {
  return dispatch => {
    dispatch(createPayloadAction(type, value));
  };
}

export function changeLoadingState(bool) {
  return dispatch => {
    dispatch(createPayloadAction(IS_APP_READY, bool));
  };
}

export function changeRouteHistory(history) {
  return dispatch => {
    dispatch(createPayloadAction(ROUTE_HISTORY, history));
  };
}
