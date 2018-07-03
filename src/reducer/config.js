import { returnPayload } from '../utils/reducerHelper';
import { handleAction } from 'redux-actions';
import { combineReducers } from 'redux';

export const IS_APP_READY = 'IS_APP_READY';
const isAppReady = handleAction(IS_APP_READY, returnPayload, false);

export default combineReducers({ isAppReady });
