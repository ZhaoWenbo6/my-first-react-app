import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'antd';
import DateRange from './DateRange';

class FilterCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <DateRange />
        <Button>近7天</Button>
        <Button>近15天</Button>
        <Button>近30天</Button>
      </Card>
    );
  }
}

export default connect()(FilterCard);
