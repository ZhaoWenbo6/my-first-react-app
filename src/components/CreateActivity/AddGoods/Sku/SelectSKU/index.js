/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 14:24:23
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 16:34:20
 * @Description: 第二部选择商品组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Spin } from 'antd';
import SelectFilter from './SelectFilter';
import { Div } from '../../../../common/Div';
import { FLEX_START_CENTER, FLEX_CENTER_CENTER } from '../../../../../consts/css';
import GoodsList from './GoodsList';
import GoodsName from './GoodsName';
import { requestGoodsList, resetQueryFilter } from '../../../../../actions/CreateActivity/addGoods';
import {
  STRING_ZERO,
  STRING_EMPTY,
  INT_ONE,
  INT_EIGHT,
  INT_ZERO,
} from '../../../../../consts/const';
import _ from 'lodash';
import { GOODS_LIST_OBJECT } from '../../../../../reducer/ActivityManagement/addGoods';
import GoodsSKU from './GoodsSKU';

class SelectSKU extends Component {
  static displayName = 'SelectSKU';

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  getGoodsList = params => {
    const { dispatch } = this.props;
    this.setState({ loading: true });
    dispatch(requestGoodsList(GOODS_LIST_OBJECT, params, this.changeState));
  };

  changeState = value => {
    this.setState({ loading: value });
  };

  resetQueryFilter = () => {
    const { dispatch } = this.props;
    dispatch(resetQueryFilter());
  };

  render() {
    const {
      firstClassification,
      secondClassification,
      thirdClassification,
      goodsName,
      goodsSKU,
      startTime,
      endTime,
    } = this.props;
    const { loading } = this.state;
    const params = {
      cid1: firstClassification === STRING_ZERO ? null : firstClassification,
      cid2: secondClassification === STRING_ZERO ? null : secondClassification,
      cid3: thirdClassification === STRING_ZERO ? null : thirdClassification,
      searchKey: goodsName === STRING_EMPTY ? null : goodsName,
      sku: goodsSKU === STRING_EMPTY ? null : goodsSKU,
      saler: null,
      pageNo: INT_ONE,
      pageSize: INT_EIGHT,
      startDate: startTime,
      endDate: endTime,
    };
    return (
      <Fragment>
        <Card style={{ width: '100%' }}>
          <Spin spinning={loading}>
            <Div styleStr={FLEX_START_CENTER}>
              所属品类： <SelectFilter />
            </Div>
            <Div styleStr={priceStr}>
              商品名称： <GoodsName />skuID： <GoodsSKU />
            </Div>
            <Div styleStr={FLEX_CENTER_CENTER}>
              <Button
                type="primary"
                style={{ margin: '10px' }}
                onClick={() => this.getGoodsList(params)}
              >
                搜索
              </Button>
              <Button style={{ margin: '10px' }} onClick={() => this.resetQueryFilter()}>
                重置
              </Button>
            </Div>
            <GoodsList filterParams={params} />
          </Spin>
        </Card>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectSKU);

function mapStateToProps(state) {
  return {
    firstClassification: _.get(state, 'create.addGoods.firstClassification', STRING_ZERO),
    secondClassification: _.get(state, 'create.addGoods.secondClassification', STRING_ZERO),
    thirdClassification: _.get(state, 'create.addGoods.thirdClassification', STRING_ZERO),
    goodsName: _.get(state, 'create.addGoods.goodsName', STRING_EMPTY),
    goodsSKU: _.get(state, 'create.addGoods.goodsSKU', STRING_EMPTY),
    startTime: _.get(state, 'create.baseInfo.startTime', INT_ZERO),
    endTime: _.get(state, 'create.baseInfo.endTime', INT_ZERO),
  };
}

const priceStr = `${FLEX_START_CENTER}; margin: 10px 0`;
