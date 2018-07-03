import { push } from 'react-router-redux';

export const DEFAULT_ROUTE = '/';

export const SET_RECORD = '/set_record';
export function gotoSetRecord() {
  return dispatch => {
    dispatch(push(SET_RECORD));
  };
}

export const NEW_SHARE = '/new_share';
export function gotoNewShare() {
  return dispatch => {
    dispatch(push(NEW_SHARE));
  };
}
