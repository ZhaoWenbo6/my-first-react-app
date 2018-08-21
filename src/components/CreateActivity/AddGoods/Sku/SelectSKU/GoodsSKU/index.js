import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InputNumber } from 'antd';
import { changeAddGoods } from '../../../../../../actions/CreateActivity/addGoods';
import { GOODS_SKU } from '../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';
import { Div } from '../../../../../common/Div';

class GoodsSKU extends Component {
  static displayName = 'GoodsSKU';

  constructor(props) {
    super(props);
  }

  onChangeName = value => {
    const { dispatch } = this.props;
    dispatch(changeAddGoods(GOODS_SKU, value ? value : ''));
  };

  render() {
    const { goodsSKU } = this.props;
    const nameLimitStyle = `color: red;margin: 0 30px; visibility:${
      goodsSKU.length > nameLengthLimit ? 'visible' : 'hidden'
    }`;
    return (
      <Fragment>
        <InputNumber
          style={{ width: '200px' }}
          placeholder="请输入skuID...18字以内"
          onChange={value => this.onChangeName(value)}
          value={goodsSKU}
          maxLength={18}
        />
        <Div styleStr={nameLimitStyle}>18字以内</Div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(GoodsSKU);

function mapStateToProps(state) {
  return {
    goodsSKU: _.get(state, 'create.addGoods.goodsSKU', ''),
  };
}

const nameLengthLimit = 17;
