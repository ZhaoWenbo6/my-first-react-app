/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-16 17:52:13
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 18:39:18
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { List, Checkbox, Tooltip } from 'antd';
import { Div } from '../../../../../../common/Div';
import { FLEX_COL_END_START } from '../../../../../../../consts/css';
import {
  requestGoodsList,
  changeAddGoods,
} from '../../../../../../../actions/CreateActivity/addGoods';
import {
  GOODS_LIST_OBJECT,
  SELECTED_GOODS_LIST,
} from '../../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';

class GoodsList extends Component {
  static displayName = 'GoodsList';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  selectGoods = (event, item) => {
    const {
      target: { checked },
    } = event;
    const {
      dispatch,
      selectedGoodsList: { data: selectedData = [] },
      goodsListObject,
    } = this.props;
    const resultList = selectedData;
    const { data: goodsListData = [] } = goodsListObject;
    const goodsList = goodsListData;
    let goodsResultList = [];
    if (checked) {
      goodsResultList = goodsList.map(beforeItem => {
        if (beforeItem.sku === item.sku) {
          beforeItem.isChecked = true;
          return beforeItem;
        }
        return beforeItem;
      });
      resultList.push({ ...item });
    } else {
      goodsResultList = goodsList.map(beforeItem => {
        if (beforeItem.sku === item.sku) {
          beforeItem.isChecked = false;
          return beforeItem;
        }
        return beforeItem;
      });
      const index = resultList.indexOf(item);
      resultList.splice(index, 1);
    }
    dispatch(changeAddGoods(GOODS_LIST_OBJECT, { ...goodsListObject, data: goodsResultList }));
    dispatch(changeAddGoods(SELECTED_GOODS_LIST, { data: resultList }));
  };

  render() {
    const {
      data: { data = [], totalItem = 8, pageNo = 1, pageSize = 8 },
      dispatch,
      filterParams,
    } = this.props;
    return (
      <Fragment>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          pagination={{
            onChange: (pageNo, pageSize = 8) => {
              dispatch(
                requestGoodsList(GOODS_LIST_OBJECT, {
                  ...filterParams,
                  ...{ pageNo: pageNo, pageSize: pageSize },
                })
              );
              console.log(pageNo, pageSize);
            },
            current: pageNo,
            pageSize: pageSize,
            total: totalItem,
          }}
          renderItem={item => (
            <List.Item>
              <Div styleStr={`${itemStr};background-image:url(${item.img})`}>
                <Div styleStr={titleStr}>
                  <Tooltip placement="topLeft" title={item.title}>
                    {item.title}
                  </Tooltip>
                </Div>
                <Div styleStr={'display: none'}>{`￥:${item.sku}`}</Div>
                <Div>{`SKU:${item.sku}`}</Div>
                <Div styleStr={checkboxItemStr}>
                  <Checkbox
                    checked={item.isChecked}
                    onChange={event => this.selectGoods(event, item)}
                  />
                </Div>
              </Div>
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(GoodsList);

function mapStateToProps(state) {
  return {
    selectedGoodsList: _.get(state, 'create.addGoods.selectedGoodsList', {}),
    goodsListObject: _.get(state, 'create.addGoods.goodsListObject', {}),
  };
}

const itemStr = `${FLEX_COL_END_START}; 
                width: 200px; 
                height: 200px;
                background-repeat: no-repeat;
                background-size: 100% 100%;
                position: relative`;
const titleStr = `overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  width: 100%;`;
const checkboxItemStr = `position: absolute;
                         top: 10px;
                         right: 10px;`;
