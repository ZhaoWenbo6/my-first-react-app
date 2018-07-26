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
import { Checkbox, Button, Modal } from 'antd';
import { Div } from '../../../../../common/Div';
import { Title } from '../../../../../common/Title';
import Lists from './Lists';
import { requestGoodsList } from '../../../../../../actions/CreateActivity/addGoods';
import { GOODS_LIST_OBJECT } from '../../../../../../reducer/ActivityManagement/addGoods';
import _ from 'lodash';

class GoodsList extends Component {
  static displayName = 'GoodsList';

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    const { dispatch, startTime, endTime } = this.props;
    dispatch(
      requestGoodsList(GOODS_LIST_OBJECT, {
        startDate: startTime,
        endDate: endTime,
        pageNo: 1,
        pageSize: 8,
      })
    );
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { goodsListObject, selectedGoodsList, filterParams } = this.props;
    return (
      <Div styleStr={containerStr}>
        <Lists data={goodsListObject} filterParams={filterParams} />
        <Title>
          <Checkbox>全选</Checkbox>
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
            <Lists data={selectedGoodsList} />
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
