import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { Div } from '../Div';

class BaseInfo extends Component {
  static displayName = 'BaseInfo';
  constructor(props) {
    super(props);
  }

  renderDetails = () => {
    const {
      data: { titles, contents, auditStatus, createTime },
      isDetails,
    } = this.props;
    const renderDom = isDetails ? (
      <Fragment>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>创建时间：</Div>
          </Col>
          <Col span={10}>{moment(createTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>审核状态：</Div>
          </Col>
          <Col span={10}>
            {auditStatus ? (auditStatus === 1 ? '审核通过' : '审核不通过') : '未审核'}
          </Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>分享标题：</Div>
          </Col>
          <Col span={10}>{titles}</Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>分享描述语：</Div>
          </Col>
          <Col span={10}>{contents}</Col>
        </Row>
      </Fragment>
    ) : (
      <Fragment />
    );
    return renderDom;
  };

  render() {
    const {
      data: { activityName, type, startTime, endTime, source },
    } = this.props;
    return (
      <Fragment>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>活动名称：</Div>
          </Col>
          <Col span={10}>{activityName}</Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>活动入口：</Div>
          </Col>
          <Col span={10}>{type === 1 ? '商详' : type === 2 ? '店铺' : '通天塔'}</Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>活动时间：</Div>
          </Col>
          <Col span={10}>
            {`${moment(startTime).format('YYYY-MM-DD HH:mm:ss')} - ${moment(endTime).format(
              'YYYY-MM-DD HH:mm:ss'
            )}`}
          </Col>
        </Row>
        <Row style={{ margin: '0 10px 10px' }}>
          <Col span={3}>
            <Div styleStr={itemsStyles}>活动渠道：</Div>
          </Col>
          <Col span={10}>{source === 1 ? 'APP' : '微信'}</Col>
        </Row>
        {this.renderDetails()}
      </Fragment>
    );
  }
}
export default BaseInfo;

const itemsStyles = 'margin: 0 10px 0 20px;';