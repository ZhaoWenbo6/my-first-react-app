import { combineReducers } from 'redux';
import { returnPayload } from '../../utils/reducerHelper';
import { handleAction } from 'redux-actions';

export const ACTIVITY_ID = 'ACTIVITY_ID';
const activityId = handleAction(ACTIVITY_ID, returnPayload, 0);

export const ACTIVITY_CHECK_FLOW = 'ACTIVITY_CHECK_FLOW';
const activityCheckFlow = handleAction(ACTIVITY_CHECK_FLOW, returnPayload, false);

export const ACTIVITY_DETAILS = 'ACTIVITY_DETAILS';
const activityDetails = handleAction(ACTIVITY_DETAILS, returnPayload, {});

export default combineReducers({
  activityId: activityId,
  activityDetails: activityDetails,
  activityCheckFlow: activityCheckFlow,
});
