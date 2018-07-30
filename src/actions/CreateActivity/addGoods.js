import { createPayloadAction } from '../../utils/actionHelper';
import { getGoodsList, getClassification } from '../../utils/api-service';
import { intersectionArr } from '../../utils/array';
import _ from 'lodash';
import {
  GOODS_NAME,
  FIRST_CLASSIFICATION,
  SECOND_CLASSIFICATION,
  THIRD_CLASSIFICATION,
  MATCH_TYPE,
  SELECTED_GOODS_LIST,
  GOODS_FIRST_CLASSIFICATION,
  GOODS_SECOND_CLASSIFICATION,
  GOODS_THIRD_CLASSIFICATION,
  SELECTED_TYPE,
  WRITE_BIZIDS,
  IS_RESPONSE,
  SKU_FILE,
  GOODS_LIST_OBJECT,
} from '../../reducer/ActivityManagement/addGoods';
import { message } from 'antd';

export function changeAddGoods(type, payload) {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(createPayloadAction(type, payload));
  };
}

export function resetAddGoods() {
  return (dispatch, getState) => {
    console.log(getState());
    dispatch(changeAddGoods(MATCH_TYPE, 1));
    dispatch(changeAddGoods(GOODS_LIST_OBJECT, {}));
    dispatch(changeAddGoods(SELECTED_GOODS_LIST, {}));
    dispatch(changeAddGoods(GOODS_NAME, ''));
    dispatch(changeAddGoods(GOODS_FIRST_CLASSIFICATION, []));
    dispatch(changeAddGoods(GOODS_SECOND_CLASSIFICATION, []));
    dispatch(changeAddGoods(GOODS_THIRD_CLASSIFICATION, []));
    dispatch(changeAddGoods(FIRST_CLASSIFICATION, '0'));
    dispatch(changeAddGoods(SECOND_CLASSIFICATION, '0'));
    dispatch(changeAddGoods(THIRD_CLASSIFICATION, '0'));
    dispatch(changeAddGoods(SELECTED_TYPE, 0));
    dispatch(changeAddGoods(WRITE_BIZIDS, ''));
    dispatch(changeAddGoods(IS_RESPONSE, false));
    dispatch(changeAddGoods(SKU_FILE, []));
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
        const [markList, unmarkList] = intersectionArr(
          requestList.map(item => {
            item.isChecked = false;
            return item;
          }),
          selectList
        );
        dispatch(
          createPayloadAction(type, {
            ...response.data.result,
            data: [...unmarkList],
          })
        );
        console.log(markList);
      }
    });
  };
}

export function requestClassification(type, params = {}) {
  return (dispatch, getState) => {
    console.log(getState());
    getClassification(params).then(response => {
      const {
        status,
        data: { result, code, message: responseMessage },
      } = response;
      if (status === 200) {
        if (code === '0') {
          dispatch(createPayloadAction(type, result));
        } else {
          message.error(responseMessage);
        }
      } else {
        message.error(`请求异常，状态码为${status}`);
      }
      console.log(response);
    });
  };
}
