import React, { Component } from 'react';
// import styled from 'styled-components';
import { Layout } from 'antd';

class PageFooter extends Component {
  static displayName = 'PageFooter';

  render() {
    const { Footer } = Layout;
    return (
      <Footer style={{ textAlign: 'center' }}>
        <p>Copyright@2004-2018 JD.com 京东版权所有 京ICP证070359</p>
        <p>北京市公安局朝阳分局备案编号110105014669</p>
      </Footer>
    );
  }
}

export default PageFooter;
