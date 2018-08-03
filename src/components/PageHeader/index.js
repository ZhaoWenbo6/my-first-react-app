import React, { Component } from 'react';
// import styled from 'styled-components';
import { Layout, Avatar } from 'antd';
import { Logo } from '../common/Logo';
import { Div } from '../common/Div';
import { LOGOUT_PAGE } from '../../consts/url';
import { FLEX_CENTER_CENTER } from '../../consts/css';
import { logout } from '../../utils/api-service';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { deleteAllCookies } from '../../utils/cookie';

class PageHeader extends Component {
  static displayName = 'PageHeader';

  clearAllCookie = () => {
    const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (let i = keys.length; i >= 0; i--) {
        document.cookie = `${keys[i]} =0;expires= ${new Date(0).toUTCString()}`;
      }
    }
  };

  logout = () => {
    // document.cookie = 'sso.jd.com=';
    this.clearAllCookie();
    logout().then(response => {
      console.log(response.data);
    });
    window.open(LOGOUT_PAGE, '_self');
  };

  render() {
    const { Header } = Layout;
    const { name } = this.props;
    return (
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        <Div styleStr={FLEX_CENTER_CENTER}>
          <Div styleStr={'margin: 10px;color: white'}>{name}</Div>
          <Avatar icon="user" />
          <a
            style={{
              margin: '10px',
              // cursor: 'pointer',
            }}
            onClick={() => this.logout()}
          >
            退出
          </a>
        </Div>
      </Header>
    );
  }
}

export default connect(mapStateToProps)(PageHeader);

function mapStateToProps(state) {
  return {
    isAppReady: _.get(state, 'config.isAppReady', false),
    name: _.get(state, 'user.info.name', ''),
  };
}
