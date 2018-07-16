/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-05 18:20:50
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:13:26
 * @Description: 通用时间组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Div } from '../Div';
import { FLEX_BETWEEN_CENTER } from '../../../consts/css';
// import moment from 'moment';

class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  }

  disabledStartDate = startValue => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    const { changeStartTime } = this.props;
    this.onChange('startValue', value);
    changeStartTime(value.valueOf());
  };

  onEndChange = value => {
    const { changeEndtTime } = this.props;
    this.onChange('endValue', value);
    changeEndtTime(value.valueOf());
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <Div styleStr={contanierDiv}>
        <DatePicker
          disabledDate={endValue => this.disabledStartDate(endValue)}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="请选择活动开始时间"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
          style={{ width: '280px' }}
        />
        <DatePicker
          disabledDate={startValue => this.disabledEndDate(startValue)}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="请选择活动结束时间"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
          style={{ width: '280px' }}
        />
      </Div>
    );
  }
}

export default DateRange;

const contanierDiv = `${FLEX_BETWEEN_CENTER} width: 570px;`;
