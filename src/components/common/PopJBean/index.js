import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../Div';
import { Radio, Card, InputNumber } from 'antd';
import { FLEX_START_CENTER } from '../../../consts/css';
import { PRIZE_QUOTA_TIME, PRIZE_QUOTA_DAY, PRIZE_QUOTA } from '../../../consts/const';

const RadioGroup = Radio.Group;
class PopJBean extends Component {
  static displayName = 'PopJBean';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      itemInfo: { prizeQuota, prizeQuotaDay, prizeQuotaTime },
      disabled,
    } = this.props;
    return (
      <Card style={{ width: 700 }}>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每次发豆数量：</Div>
          <RadioGroup
            onChange={event => this.updateValue(event.target.value, PRIZE_QUOTA_TIME)}
            value={prizeQuotaTime}
            disabled={disabled}
          >
            <Radio value={0}>1京豆</Radio>
            <Radio value={1}>3京豆</Radio>
            <Radio value={2}>5京豆</Radio>
            <Radio value={3}>10京豆</Radio>
            <Radio value={4}>15京豆</Radio>
            <Radio value={5}>20京豆</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>每天赠送份数：</Div>
          <InputNumber
            min={0}
            value={prizeQuotaDay}
            placeholder="请输入赠送数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA_DAY)}
            disabled={disabled}
          />
        </Div>
        <Div styleStr={`${FLEX_START_CENTER}; margin: 0 10px 10px`}>
          <Div styleStr={'margin: 10px'}>总赠送豆份数：</Div>
          <InputNumber
            min={0}
            value={prizeQuota}
            placeholder="请输入赠送数量"
            style={{ width: '200px' }}
            onChange={value => this.updateValue(value, PRIZE_QUOTA)}
            disabled={disabled}
          />
        </Div>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(PopJBean);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
