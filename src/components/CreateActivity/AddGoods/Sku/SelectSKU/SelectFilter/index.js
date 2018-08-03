/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-19 15:40:16
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 16:30:01
 * @Description: 选择商品过滤条件，写的有些乱，维护人员注意组件联动条件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Select, Tooltip } from 'antd';
import { Div } from '../../../../../common/Div';
import { MARGIN_RIGHT_TEN } from '../../../../../../consts/css';
import {
  requestClassification,
  changeAddGoods,
} from '../../../../../../actions/CreateActivity/addGoods';
import {
  GOODS_FIRST_CLASSIFICATION,
  GOODS_SECOND_CLASSIFICATION,
  GOODS_THIRD_CLASSIFICATION,
  FIRST_CLASSIFICATION,
  THIRD_CLASSIFICATION,
  SECOND_CLASSIFICATION,
} from '../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';
import { STRING_ZERO } from '../../../../../../consts/const';

const Option = Select.Option;

class SelectFilter extends Component {
  static displayName = 'SelectFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, goodsFirstClassification } = this.props;
    if (goodsFirstClassification.length === 0) {
      dispatch(requestClassification(GOODS_FIRST_CLASSIFICATION, {}));
    }
  }

  getSecondeValue = value => {
    const { dispatch } = this.props;
    dispatch(changeAddGoods(FIRST_CLASSIFICATION, value === STRING_ZERO ? STRING_ZERO : value)); //设置一级分类
    dispatch(changeAddGoods(SECOND_CLASSIFICATION, '0')); //恢复默认值
    dispatch(changeAddGoods(THIRD_CLASSIFICATION, '0')); //恢复默认值
    dispatch(requestClassification(GOODS_SECOND_CLASSIFICATION, { itemFirstCateCd: value })); //查询二级分类
  };

  getThirdValue = value => {
    const { dispatch } = this.props;
    dispatch(changeAddGoods(SECOND_CLASSIFICATION, value === STRING_ZERO ? STRING_ZERO : value)); //恢复默认值
    dispatch(changeAddGoods(THIRD_CLASSIFICATION, '0')); //恢复默认值
    dispatch(requestClassification(GOODS_THIRD_CLASSIFICATION, { itemSecondCateCd: value }));
  };

  setThirdValue = value => {
    const { dispatch } = this.props;
    dispatch(changeAddGoods(THIRD_CLASSIFICATION, value === STRING_ZERO ? STRING_ZERO : value)); //恢复默认值
  };

  render() {
    const {
      goodsFirstClassification,
      goodsSecondClassification,
      goodsThirdClassification,
      firstClassification,
      secondClassification,
      thirdClassification,
    } = this.props;
    const firstSelectDom = goodsFirstClassification.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    const secondSelectDom = goodsSecondClassification.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    const thirdSelectDom = goodsThirdClassification.map(item => (
      <Option key={item.code}>
        <Tooltip placement="left" title={item.name}>
          {item.name}
        </Tooltip>
      </Option>
    ));
    return (
      <Fragment>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          一级：
          <Select
            defaultValue="请选择一级分类"
            style={{ width: 120 }}
            value={firstClassification}
            onSelect={value => this.getSecondeValue(value)}
          >
            <Option value="0">请选择一级分类</Option>
            {firstSelectDom}
          </Select>
        </Div>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          二级：
          <Select
            defaultValue="请选择二级分类"
            style={{ width: 120 }}
            value={secondClassification}
            onSelect={value => this.getThirdValue(value)}
          >
            <Option value="0">请选择二级分类</Option>
            {secondSelectDom}
          </Select>
        </Div>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          三级：
          <Select
            defaultValue="请选择三级分类"
            style={{ width: 120 }}
            value={thirdClassification}
            onSelect={value => this.setThirdValue(value)}
          >
            <Option value="0">请选择三级分类</Option>
            {thirdSelectDom}
          </Select>
        </Div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectFilter);

function mapStateToProps(state) {
  return {
    goodsFirstClassification: _.get(state, 'create.addGoods.goodsFirstClassification', []),
    goodsSecondClassification: _.get(state, 'create.addGoods.goodsSecondClassification', []),
    goodsThirdClassification: _.get(state, 'create.addGoods.goodsThirdClassification', []),
    firstClassification: _.get(state, 'create.addGoods.firstClassification', []),
    secondClassification: _.get(state, 'create.addGoods.secondClassification', []),
    thirdClassification: _.get(state, 'create.addGoods.thirdClassification', []),
  };
}
