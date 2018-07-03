/*
 * @Author: Wenbo Zhao
 * @Date: 2018-06-26 20:23:09
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-06-26 20:29:09
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @youWant: 
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user';

class Loading extends Component {
  static displayName = 'Loading';
  static getDerivedStateFromProps(nextProps) {
    nextProps.dispatch(getUserInfo());
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Spin size="large" />
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Loading);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
`;
