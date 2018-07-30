import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio, Row } from 'antd';
import { Div } from '../../../common/Div';
import SelectSKU from './SelectSKU';
import WriteSKU from './WriteSKU';
import { MARGIN_TEN_ZERO } from '../../../../consts/css';
import _ from 'lodash';
import { changeAddGoods } from '../../../../actions/CreateActivity/addGoods';
import {
  SELECTED_TYPE,
  SELECTED_GOODS_LIST,
  WRITE_BIZIDS,
  SKU_FILE,
} from '../../../../reducer/ActivityManagement/addGoods';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Sku extends Component {
  static displayName = 'Sku';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    const { dispatch } = this.props;
    const {
      target: { value },
    } = event;
    if (value === 1) {
      dispatch(changeAddGoods(SELECTED_GOODS_LIST, { data: [] }));
    } else {
      dispatch(changeAddGoods(WRITE_BIZIDS, ''));
      dispatch(changeAddGoods(SKU_FILE, []));
    }
    dispatch(changeAddGoods(SELECTED_TYPE, parseInt(value, 10)));
  };

  render() {
    const { selectedType } = this.props;
    return (
      <Div>
        <Row span={8} style={{ color: 'red', alignItems: 'center', margin: '15px' }}>
          温馨提示：如商品正在秒杀、拼购等促销活动投放期，则该商品无法投放分享
        </Row>
        <RadioGroup onChange={event => this.onChange(event)} value={selectedType}>
          <RadioButton value={0}>选择商品</RadioButton>
          <RadioButton value={1}>按sku填写</RadioButton>
        </RadioGroup>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[selectedType].content}</Div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(Sku);

function mapStateToProps(state) {
  return {
    selectedType: _.get(state, 'create.addGoods.selectedType', 0),
  };
}

const arr = [
  {
    title: 'select',
    content: <SelectSKU />,
  },
  {
    title: 'write',
    content: <WriteSKU />,
  },
];
