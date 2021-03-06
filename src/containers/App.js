import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import _ from 'lodash';
import { Layout } from 'antd';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
// import PageBreadcrumb from '../components/PageBreadcrumb';
// import PageFooter from '../components/PageFooter';

class App extends Component {
  static displayName = 'App';

  render() {
    const { Content } = Layout;

    return (
      <div className="App">
        <Layout style={{ height: '100%' }}>
          <PageHeader />
          <Layout style={{ padding: '10px 50px 0' }}>
            <Navigation />
            <Layout style={{ padding: '0 24px 24px' }}>
              {/*<PageBreadcrumb />*/}
              <Content style={{ background: '#fff', padding: 24, margin: 0 }}>
                {this.props.children}
              </Content>
            </Layout>
          </Layout>
          {/*<PageFooter />*/}
        </Layout>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);

function mapStateToProps(state) {
  return {
    userType: _.get(state, 'user.userType', null),
    money: state.user.money,
  };
}
