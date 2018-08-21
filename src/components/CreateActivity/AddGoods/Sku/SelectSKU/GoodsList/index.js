/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 17:46:09
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 18:38:29
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button, Modal, List, Tooltip } from 'antd';
import { Div } from '../../../../../common/Div';
import { Title } from '../../../../../common/Title';
import Lists from './Lists';
import {
  // requestGoodsList,
  changeAddGoods,
} from '../../../../../../actions/CreateActivity/addGoods';
import {
  GOODS_LIST_OBJECT,
  SELECTED_GOODS_LIST,
} from '../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';
import { FLEX_COL_END_START } from '../../../../../../consts/css';

class GoodsList extends Component {
  static displayName = 'GoodsList';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  selectAll = event => {
    const {
      target: { checked },
    } = event;
    const {
      dispatch,
      selectedGoodsList: { data: selectedData = [] },
      goodsListObject,
    } = this.props;
    let resultList = selectedData;
    const { data: goodsListData = [] } = goodsListObject;
    const goodsList = goodsListData;
    let goodsResultList = [];
    if (checked) {
      goodsResultList = goodsList.map(beforeItem => {
        if (!beforeItem.isChecked) {
          beforeItem.isChecked = true;
          if (!beforeItem.used) {
            resultList.push({ ...beforeItem });
          }
        }
        return beforeItem;
      });
    } else {
      goodsResultList = goodsList.map(beforeItem => {
        if (beforeItem.isChecked) {
          const index = resultList.map(item => item.sku).indexOf(beforeItem.sku);
          resultList.splice(index, 1, '');
          resultList = resultList.filter(item => item !== '');
          beforeItem.isChecked = false;
          return beforeItem;
        } else if (beforeItem.used) {
          return beforeItem;
        }
      });
    }
    dispatch(changeAddGoods(GOODS_LIST_OBJECT, { ...goodsListObject, data: goodsResultList }));
    dispatch(changeAddGoods(SELECTED_GOODS_LIST, { data: resultList }));
  };

  isChecked = () => {
    const {
      goodsListObject: { data },
    } = this.props;
    if (data) {
      return !(data.filter(item => !item.used && item.isChecked === false).length > 0);
    } else {
      return false;
    }
  };

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

  isDisable = () => {
    const {
      goodsListObject: { data },
    } = this.props;
    if (data) {
      if (data.length === data.filter(item => item.used === true).length) {
        return true;
      }
    }
    return false;
  };

  render() {
    const { goodsListObject, selectedGoodsList, filterParams } = this.props;
    return (
      <Div styleStr={containerStr}>
        <Lists data={goodsListObject} filterParams={filterParams} />
        <Title>
          <Checkbox
            disabled={this.isDisable()}
            checked={this.isChecked()}
            onChange={event => this.selectAll(event)}
          >
            全选
          </Checkbox>
          <Button type="primary" style={{ margin: '0  10px' }} onClick={() => this.showModal()}>
            查看已选商品
          </Button>
          <Modal
            title="已选商品"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            width={1040}
            footer={null}
          >
            <List
              grid={{ gutter: 16, column: 4 }}
              dataSource={selectedGoodsList.data}
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
          </Modal>
        </Title>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(GoodsList);

function mapStateToProps(state) {
  return {
    startTime: _.get(state, 'create.baseInfo.startTime', 0),
    endTime: _.get(state, 'create.baseInfo.endTime', 0),
    goodsListObject: _.get(state, 'create.addGoods.goodsListObject', {}),
    selectedGoodsList: _.get(state, 'create.addGoods.selectedGoodsList', {}),
  };
}

const containerStr = 'margin: 10px 0';

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
