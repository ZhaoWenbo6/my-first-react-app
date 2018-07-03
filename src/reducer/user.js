import { returnPayload } from '../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';

export const USER_INFO = 'USER_INFO';
const info = handleAction(USER_INFO, returnPayload, {});

export const USER_TYPE = 'USER_TYPE';
const type = handleAction(USER_TYPE, returnPayload, '');

export const MONEY = 'MONEY';
const money = handleAction(MONEY, returnPayload, '');

export default combineReducers({ info, type, money });
