import { handleActions } from 'redux-actions';

export const returnPayload = (state, action) => action.payload;

export function createPayloadReducer(type) {
  return handleActions(
    {
      [type]: (state, action) => ({ ...state, ...action.payload }),
    },
    {}
  );
}
