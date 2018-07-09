import { createPayloadAction } from '../../utils/actionHelper';

export function changeCurrentStep(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}
