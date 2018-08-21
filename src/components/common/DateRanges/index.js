import React, { Component } from 'react';
import moment from 'moment';
import { DatePicker } from 'antd';

class DateRanges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      now: moment(),
      disabled: true,
      startStatus: false,
      endStatus: false,
      startValue: null,
      endValue: null,
      visible: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if ('value' in nextProps) {
      const { value = [] } = nextProps;
      const { startValue: start, endValue: end } = prevState;
      const startValue = value[0] ? moment(value[0]) : start;
      const endValue = value[1] ? moment(value[1]) : end;
      const disabled = !(startValue && endValue);
      const mid = moment(startValue);
      const last = mid.add(91, 'day');
      return { last: last, startValue: startValue, endValue: endValue, disabled: disabled };
    }
    return null;
  }

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };

  triggerChange = changedValue => {
    const { onChange } = this.props;
    onChange && onChange(changedValue);
  };

  onStartOpenChange = status => {
    const { startValue } = this.state;
    const now = moment();
    this.setState({ startValue: now, startStatus: status, now: now });
    if (!status && startValue) {
      const mid = moment(startValue);
      const last = mid.add(91, 'day');
      this.setState({ endStatus: true, last: last, disabled: false });
    }
  };
  onEndOpenChange = status => {
    const { startValue, visible } = this.state;
    if (startValue) {
      this.setState({ endStatus: status });
    } else {
      !visible && this.setState({ visible: true });
    }
  };

  onStartChange = startValue => {
    this.setState({ startValue: startValue, endValue: null, visible: false });
    if (!startValue) {
      this.setState({ disabled: true });
    }
    const v = [this.getUnix(startValue), 0];
    this.triggerChange(v);
  };

  getUnix = date => {
    if (date) {
      const str = date.format('YYYY-MM-DD HH:mm:ss');
      const d = new Date(str);
      return d.getTime();
    }
    return 0;
  };

  onEndChange = endValue => {
    const { startValue } = this.state;
    this.setState({ endValue: endValue });
    const v = [this.getUnix(startValue), this.getUnix(endValue)];
    this.triggerChange(v);
  };

  disabledStartTime = date => {
    const { now } = this.state;
    if (date && now) {
      if (now.dayOfYear() !== date.dayOfYear()) {
        return {
          disabledHours: () => [],
          disabledMinutes: () => [],
          disabledSeconds: () => [],
        };
      } else {
        const hour = now.hour();
        const minute = now.minute();
        const second = now.second();
        return {
          disabledHours: () => this.range(0, 24).splice(0, hour),
          disabledMinutes: () => {
            if (hour < date.hour()) {
              return [];
            }
            return this.range(0, 60).splice(0, minute);
          },
          disabledSeconds: () => {
            if (hour < date.hour()) {
              return [];
            } else if (hour === date.hour()) {
              if (minute < date.minute()) {
                return [];
              }
              return this.range(0, 60).splice(0, second);
            }
            return this.range(0, 60).splice(0, second);
          },
        };
      }
    }
  };

  disabledEndTime = date => {
    const { last, startValue } = this.state;
    if (startValue) {
      const midLast = moment(last);
      midLast.subtract(1, 'day');
      const hour = startValue.hour();
      const minute = startValue.minute();
      const second = startValue.second();
      if (startValue && date && last) {
        if (startValue.dayOfYear() === date.dayOfYear()) {
          return {
            disabledHours: () => this.range(0, 24).splice(0, hour),
            disabledMinutes: () => {
              if (hour < date.hour()) {
                return [];
              }
              return this.range(0, 60).splice(0, minute);
            },
            disabledSeconds: () => {
              if (hour < date.hour()) {
                return [];
              } else if (hour === date.hour()) {
                if (minute < date.minute()) {
                  return [];
                }
                return this.range(0, 60).splice(0, second);
              }
              return this.range(0, 60).splice(0, second);
            },
          };
        } else if (midLast.dayOfYear() === date.dayOfYear()) {
          const hour = last.hour();
          const minute = last.minute();
          const second = last.second();
          return {
            disabledHours: () => this.range(0, 24).splice(hour + 1, 24),
            disabledMinutes: () => {
              if (hour > date.hour()) {
                return [];
              }
              return this.range(0, 60).splice(minute + 1, 60);
            },
            disabledSeconds: () => {
              if (hour > date.hour()) {
                return [];
              } else if (hour === date.hour()) {
                if (minute > date.minute()) {
                  return [];
                }
                return this.range(0, 60).splice(second + 1, 60);
              }
              return this.range(0, 60).splice(second + 1, 60);
            },
          };
        } else {
          return {
            disabledHours: () => [],
            disabledMinutes: () => [],
            disabledSeconds: () => [],
          };
        }
      }
      return {
        disabledHours: () => this.range(0, 24).splice(0, hour),
        disabledMinutes: () => this.range(0, 60).splice(0, minute),
        disabledSeconds: () => this.range(0, 60).splice(0, second),
      };
    }
  };

  disabledStartDate = date => {
    return date && date < moment().subtract(1, 'day');
  };
  disabledEndDate = date => {
    const { last, startValue } = this.state;
    if (!startValue || !date) {
      return false;
    }
    return date.valueOf() <= startValue.valueOf() || date.valueOf() >= last.valueOf();
  };

  onStartOk = data => {
    if (data) {
      const { startValue } = this.state;
      const mid = moment(startValue);
      const last = mid.add(91, 'day');
      this.setState({ endStatus: true, last: last, disabled: false });
    }
  };

  onEndOk = data => {
    if (!data) {
      const { startValue } = this.state;

      const year = startValue.year();
      const month = startValue.month() + 1;
      const day = startValue.date();
      const endValue = moment(`${year}-${month}-${day} 23:59:59`);

      this.setState({ endValue: endValue });
      const v = [this.getUnix(startValue), this.getUnix(endValue)];
      this.triggerChange(v);
    }
  };

  render() {
    const { isDate = true, isTime = true } = this.props;
    const { startStatus, endStatus, now, startValue = null, endValue = null, visible } = this.state;

    return (
      <div style={{ width: '50%' }}>
        <DatePicker
          value={startValue}
          open={startStatus}
          onOpenChange={this.onStartOpenChange}
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{
            defaultValue: moment(now, 'HH:mm:ss'),
          }}
          showToday={false}
          onChange={this.onStartChange}
          disabledDate={isDate ? this.disabledStartDate : null}
          disabledTime={isTime ? this.disabledStartTime : null}
          onOk={this.onStartOk}
        />
        <span style={{ margin: '0 5px' }}>-</span>
        <DatePicker
          disabled={false}
          value={endValue}
          open={endStatus}
          showTime
          onOpenChange={this.onEndOpenChange}
          format="YYYY-MM-DD HH:mm:ss"
          showToday={false}
          onChange={this.onEndChange}
          disabledDate={isDate ? this.disabledEndDate : null}
          disabledTime={isTime ? this.disabledEndTime : null}
          onOk={this.onEndOk}
        />
        <span
          style={{ color: 'red', display: visible ? 'inline-block' : 'none', marginLeft: '10px' }}
        >
          请先选择开始时间
        </span>
      </div>
    );
  }
}

export default DateRanges;
