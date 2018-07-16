/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 14:52:07
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 11:49:18
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happenwonderful is about to happenwonderful is about to happenwonderful is about to happenwonderful is about to happenwonderful is about to happenwonderful is about to happenwonderful is about to happen
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { getClassification } from '../../../../../../utils/api-service';
import { Div } from '../../../../../common/Div';
import { MARGIN_RIGHT_TEN } from '../../../../../../consts/css';

const Option = Select.Option;

class SelectFilter extends Component {
  static displayName = 'SelectFilter';

  constructor(props) {
    super(props);
    this.state = {
      firstSelect: [],
      secondSelect: [],
      thirdSelect: [],
    };
  }

  componentDidMount() {
    // getClassification().then(response => {
    //   if (response.status === 200) {
    //     this.setState({ firstSelect: response.data.result });
    //   }
    // });
  }

  getSecondeSelect = value => {
    getClassification({ itemFirstCateCd: value }).then(response => {
      if (response.status === 200) {
        this.setState({ secondSelect: response.data.result });
      }
    });
  };

  getThirdSelect = value => {
    getClassification({ itemSecondCateCd: value }).then(response => {
      if (response.status === 200) {
        this.setState({ thirdSelect: response.data.result });
      }
    });
  };

  render() {
    const { firstSelect, secondSelect, thirdSelect } = this.state;
    const firstSelectDom = firstSelect.map(item => <Option key={item.code}>{item.name}</Option>);
    const secondSelectDom = secondSelect.map(item => <Option key={item.code}>{item.name}</Option>);
    const thirdSelectDom = thirdSelect.map(item => <Option key={item.code}>{item.name}</Option>);
    return (
      <Fragment>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          一级：
          <Select
            defaultValue="请选择一级分类"
            style={{ width: 120 }}
            onChange={value => this.getSecondeSelect(value)}
          >
            {firstSelectDom}
          </Select>
        </Div>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          二级：
          <Select
            defaultValue="请选择二级分类"
            style={{ width: 120 }}
            onChange={value => this.getThirdSelect(value)}
          >
            {secondSelectDom}
          </Select>
        </Div>
        <Div styleStr={MARGIN_RIGHT_TEN}>
          三级：
          <Select defaultValue="请选择三级分类" style={{ width: 120 }}>
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
    isAppReady: state.config.isAppReady,
  };
}

// const selectStyle = { width: 150, marginRight: '10px' };
