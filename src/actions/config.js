import { createPayloadAction } from '../utils/actionHelper';
import { IS_APP_READY } from '../reducer/config';

export function changeLoadingState(bool) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(IS_APP_READY, bool));
  };
}
