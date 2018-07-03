import React, { Component } from 'react';
// import styled from 'styled-components';
import { Breadcrumb } from 'antd';

class PageBreadcrumb extends Component {
  static displayName = 'PageBreadcrumb';

  render() {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
}

export default PageBreadcrumb;
