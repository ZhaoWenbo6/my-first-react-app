import { createPayloadAction } from '../../utils/actionHelper';
import { getGoodsList, getClassification } from '../../utils/api-service';
import { intersectionArr } from '../../utils/array';
import _ from 'lodash';
import {
  GOODS_NAME,
  FIRST_CLASSIFICATION,
  SECOND_CLASSIFICATION,
  THIRD_CLASSIFICATION,
} from '../../reducer/ActivityManagement/addGoods';

export function changeAddGoods(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetQueryFilter() {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(GOODS_NAME, ''));
    dispatch(changeAddGoods(FIRST_CLASSIFICATION, '0')); //设置一级分类
    dispatch(changeAddGoods(SECOND_CLASSIFICATION, '0')); //恢复默认值
    dispatch(changeAddGoods(THIRD_CLASSIFICATION, '0')); //恢复默认值
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
