import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { Div } from '../../../common/Div';
import SelectSKU from './SelectSKU';
import WriteSKU from './WriteSKU';
import { MARGIN_TEN_ZERO } from '../../../../consts/css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Sku extends Component {
  static displayName = 'Sku';

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
        <RadioGroup onChange={this.onChange} defaultValue="0">
          <RadioButton value="0">选择商品</RadioButton>
          <RadioButton value="1">按sku填写</RadioButton>
        </RadioGroup>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[this.state.value].content}</Div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(Sku);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
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
