import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { Div } from '../../common/Div';
import Sku from './SKU';
import TowerActivity from './TowerActivity';
import { MARGIN_TEN_ZERO } from '../../../consts/css';
import _ from 'lodash';

const RadioGroup = Radio.Group;
class AddGoods extends Component {
  static displayName = 'AddGoods';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activityType } = this.props;
    const isDisabled = activityType === 1;
    return (
      <Div>
        <Div>
          <RadioGroup value={activityType}>
            <Radio value={1} disabled={!isDisabled}>
              按SKU设置
            </Radio>
            <Radio value={3} disabled={isDisabled}>
              通天塔活动
            </Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[activityType === 1 ? 0 : 1].content}</Div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(AddGoods);

function mapStateToProps(state) {
  return {
    activityType: _.get(state, 'create.baseInfo.activityType', 1),
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
