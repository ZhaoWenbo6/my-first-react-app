import * as ActionTypes from '../consts/index';
import { actionPayloadReducer } from '../utils/reducer-helper';

export const userName = {
  [ActionTypes.USER_NAME]: actionPayloadReducer,
};

export const userAge = {
  [ActionTypes.USER_AGE]: actionPayloadReducer,
};
