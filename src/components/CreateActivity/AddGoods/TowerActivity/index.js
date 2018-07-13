import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import { Input } from 'antd';

const { TextArea } = Input;

class TowerActivity extends Component {
  static displayName = 'TowerActivity';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Div>
        <TextArea
          rows={4}
          placeholder="如12333999，12333999，12333999，12333999，多个id用英文分割符隔开"
        />
      </Div>
    );
  }
}

export default connect(mapStateToProps)(TowerActivity);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

// const arr = [
//   {
//     title: 'First',
//     content: 'First-content',
//   },
//   {
//     title: 'Second',
//     content: 'Second-content',
//   },
//   {
//     title: 'Last',
//     content: 'Last-content',
//   },
// ];
