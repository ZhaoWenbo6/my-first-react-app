import { handleActions } from 'redux-actions';

export function handleActionsReducor(defaultState, handleActionsObject) {
  return handleActions(handleActionsObject, defaultState);
}

export const actionPayloadReducer = (state, action) => action.payload;
