import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import { Input, message } from 'antd';
import { RESPONSE_CODE_ZERO } from '../../../../consts/api';
import { checkTower } from '../../../../utils/api-service';
import _ from 'lodash';

const { TextArea } = Input;

class TowerActivity extends Component {
  static displayName = 'TowerActivity';

  constructor(props) {
    super(props);
    this.state = {};
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleChange = event => {
    event.persist();
    this.emitChangeDebounced(event);
  };

  emitChange = event => {
    const { value } = event.target;
    checkTower({ ids: value }).then(response => {
      if (response.status === 200) {
        const { code } = response.data;
        if (code === RESPONSE_CODE_ZERO) {
          message.success('输入的skuId均有效');
          console.log(response);
        }
      }
    });
  };

  render() {
    return (
      <Div>
        <TextArea
          rows={4}
          placeholder="12333999，12333999，12333999，12333999，多个id用英文分割符隔开"
          onChange={event => this.handleChange(event)}
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
