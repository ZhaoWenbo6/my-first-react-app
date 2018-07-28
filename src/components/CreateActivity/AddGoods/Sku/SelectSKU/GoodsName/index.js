/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-16 11:46:58
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-19 16:53:26
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { changeAddGoods } from '../../../../../../actions/CreateActivity/addGoods';
import { GOODS_NAME } from '../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';
import { Div } from '../../../../../common/Div';

class SelectFilter extends Component {
  static displayName = 'SelectFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeName = event => {
    const { dispatch } = this.props;
    const {
      target: { value },
    } = event;
    dispatch(changeAddGoods(GOODS_NAME, value));
  };

  render() {
    const { goodsName } = this.props;
    const nameLimitStyle = `color: red;margin: 0 30px; visibility:${
      goodsName.length > nameLengthLimit ? 'visible' : 'hidden'
    }`;
    return (
      <Fragment>
        <Input
          style={{ width: '400px' }}
          placeholder="请输入商品名称... 30字以内"
          onChange={event => this.onChangeName(event)}
          value={goodsName}
          maxLength={30}
        />
        <Div styleStr={nameLimitStyle}>30字以内</Div>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectFilter);

function mapStateToProps(state) {
  return {
    goodsName: _.get(state, 'create.addGoods.goodsName', ''),
  };
}

const nameLengthLimit = 29;
