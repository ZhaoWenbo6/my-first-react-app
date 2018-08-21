import { createPayloadAction } from '../../utils/actionHelper';

export function changeActivityDetailsValue(type, payload) {
  return dispatch => {
    dispatch(createPayloadAction(type, payload));
  };
}
