import React, { Component } from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class DateRange extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  disabledDate = current => {
    // Can not select days before today and today
    const today = moment();
    const str = `${today.year()}-${today.month() + 1}-${today.date()}`;
    console.log(str);
    return current && current >= moment(str);
  };

  disabledRangeTime = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => this.range(0, 60).splice(4, 20),
        disabledMinutes: () => this.range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => this.range(0, 60).splice(20, 4),
      disabledMinutes: () => this.range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };

  render() {
    return (
      <DatePicker.RangePicker
        disabledDate={this.disabledDate}
        disabledTime={this.disabledRangeTime}
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
        }}
        format="YYYY-MM-DD HH:mm:ss"
      />
    );
  }
}

export default DateRange;
