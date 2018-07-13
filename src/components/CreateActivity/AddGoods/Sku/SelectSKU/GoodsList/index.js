/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 17:46:09
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-12 18:36:41
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Checkbox, Button } from 'antd';
import { Div } from '../../../../../common/Div';
import { Title } from '../../../../../common/Title';

class GoodsList extends Component {
  static displayName = 'GoodsList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const data = [
      {
        content: '1',
      },
      {
        content: '2',
      },
      {
        content: '3',
      },
      {
        content: '4',
      },
      {
        content: '5',
      },
      {
        content: '6',
      },
      {
        content: '7',
      },
      {
        content: '8',
      },
      {
        content: '9',
      },
      {
        content: '10',
      },
      {
        content: '11',
      },
      {
        content: '12',
      },
    ];
    return (
      <Div styleStr={containerStr}>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={data}
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 8,
          }}
          renderItem={item => (
            <List.Item>
              <Div styleStr={itemStr}>{item.content}</Div>
            </List.Item>
          )}
        />
        <Title>
          <Checkbox>全选</Checkbox>
          <Button type="primary" style={{ margin: '0 10px' }}>
            查看已选商品
          </Button>
        </Title>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(GoodsList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const containerStr = 'margin: 10px 0';
const itemStr = 'width: 200px; height: 200px';
