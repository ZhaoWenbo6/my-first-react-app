import React, { Component } from 'react';
// import styled from 'styled-components';
import { Layout, Avatar } from 'antd';
import { Logo } from '../common/Logo';

class PageHeader extends Component {
  static displayName = 'PageHeader';

  render() {
    const { Header } = Layout;
    return (
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <Avatar icon="user" />
      </Header>
    );
  }
}

export default PageHeader;
