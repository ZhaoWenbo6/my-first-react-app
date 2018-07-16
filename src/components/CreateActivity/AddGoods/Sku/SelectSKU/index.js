/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 14:24:23
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-12 18:20:40
 * @Description: 第二部选择商品组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import SelectFilter from './SelectFilter';
import { Div } from '../../../../common/Div';
import { FLEX_START_CENTER, FLEX_CENTER_CENTER } from '../../../../../consts/css';
import GoodsList from './GoodsList';
import GoodsName from './GoodsName';

class SelectSKU extends Component {
  static displayName = 'SelectSKU';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Card style={{ width: '100%' }}>
          <Div styleStr={FLEX_START_CENTER}>
            所属品类： <SelectFilter />
          </Div>
          <Div styleStr={priceStr}>
            商品名称： <GoodsName />
          </Div>
          <Div styleStr={FLEX_CENTER_CENTER}>
            <Button type="primary" style={{ margin: '10px' }}>
              搜索
            </Button>
            <Button type="primary" style={{ margin: '10px' }}>
              重置
            </Button>
          </Div>
          <GoodsList />
        </Card>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectSKU);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const priceStr = `${FLEX_START_CENTER}; margin: 10px 0`;
