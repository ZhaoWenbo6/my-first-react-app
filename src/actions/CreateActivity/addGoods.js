import { createPayloadAction } from '../../utils/actionHelper';
import { getGoodsList, getClassification } from '../../utils/api-service';
import { intersectionArr } from '../../utils/array';
import _ from 'lodash';

export function changeAddGoods(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function requestGoodsList(type, params = {}) {
  return (dispatch, getState) => {
    console.log(getState());
    getGoodsList(params).then(response => {
      if (response.status === 200) {
        const {
          selectedGoodsList: { data: selectList = [] },
        } = _.get(getState(), 'create.addGoods');
        const requestList = _.get(response, 'data.result.data', []);
        const [markList, unmarkList] = intersectionArr(requestList, selectList);
        dispatch(
          createPayloadAction(type, {
            ...response.data.result,
            data: [...markList, ...unmarkList],
          })
        );
      }
      console.log(response);
    });
  };
}

export function requestClassification(type, params = {}) {
  return (dispatch, getState) => {
    console.log(getState());
    getClassification(params).then(response => {
      if (response.status === 200) {
        dispatch(createPayloadAction(type, response.data.result));
      }
      console.log(response);
    });
  };
}
