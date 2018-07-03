import React, { Component } from 'react';
// import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {
  NEW_ACTIVITY_TEXT,
  ACTIVITY_LIST,
  ACTIVITY_TEXT_LIST,
  CREATE_ACTIVITY,
  VIEW_DATA_BY_DAY,
  VIEW_DATA_BY_ACTIVITY,
} from '../../consts/route';

class Navigation extends Component {
  static displayName = 'Navigation';

  render() {
    const { SubMenu } = Menu;
    const { Sider } = Layout;
    return (
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />活动管理
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to={CREATE_ACTIVITY}>创建活动</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={ACTIVITY_LIST}>活动列表</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />数据看板
              </span>
            }
          >
            <Menu.Item key="3">
              <Link to={VIEW_DATA_BY_DAY}>按天查看</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to={VIEW_DATA_BY_ACTIVITY}>按活动查看</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub3"
            title={
              <span>
                <Icon type="laptop" />活动语管理
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to={NEW_ACTIVITY_TEXT}>新增活动语</Link>新增活动语
            </Menu.Item>
            <Menu.Item key="6">
              <Link to={ACTIVITY_TEXT_LIST}>活动语列表</Link>活动语列表
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    );
  }
}

export default Navigation;
