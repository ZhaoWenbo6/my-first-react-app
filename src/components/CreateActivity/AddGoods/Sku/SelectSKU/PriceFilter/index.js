/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 15:56:19
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-12 17:36:12
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { InputNumber } from 'antd';
import { Div } from '../../../../../common/Div';

class SelectFilter extends Component {
  static displayName = 'SelectFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <InputNumber
          style={{ width: '150px' }}
          formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\￥\s?|(,*)/g, '')}
        />
        <Div styleStr="margin: 0 10px">~</Div>
        <InputNumber
          style={{ width: '150px' }}
          formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\￥\s?|(,*)/g, '')}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectFilter);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
