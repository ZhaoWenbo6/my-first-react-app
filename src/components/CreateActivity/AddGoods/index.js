import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { Div } from '../../common/Div';
import Sku from './Sku';
import TowerActivity from './TowerActivity';
import { MARGIN_TEN_ZERO } from '../../../consts/css';

const RadioGroup = Radio.Group;
class AddGoods extends Component {
  static displayName = 'AddGoods';

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  onChange = event => {
    console.log('radio checked', event.target.value);
    this.setState({
      value: event.target.value,
    });
  };

  render() {
    return (
      <Div>
        <Div>
          <RadioGroup onChange={event => this.onChange(event)} value={this.state.value} style={{}}>
            <Radio value={0}>按SKU设置</Radio>
            <Radio value={1}>通天塔活动</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[this.state.value].content}</Div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(AddGoods);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const arr = [
  {
    title: 'First',
    content: <Sku />,
  },
  {
    title: 'Second',
    content: <TowerActivity />,
  },
];
