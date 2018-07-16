/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-16 11:46:58
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 11:46:58
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';

class SelectFilter extends Component {
  static displayName = 'SelectFilter';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Input
          style={{ width: '400px' }}
          placeholder="请输入活动名称... 30字以内"
          onChange={event => this.onChangeName(event)}
        />
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(SelectFilter);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
