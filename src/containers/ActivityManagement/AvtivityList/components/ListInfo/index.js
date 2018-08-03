/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:29:47
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 20:35:37
 * @Description: 活动列表页
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Button, Divider, message, Tooltip } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { requestActivityListInfo } from '../../../../../actions/ActivityList';
import { changeCurrentStep } from '../../../../../actions/CreateActivity';
import { CURRENT_STEP } from '../../../../../reducer/ActivityManagement';
import { BASE_INFO, ACTIVITY_DETAILS, ACTIVITY_LIST } from '../../../../../consts/route';
import { Div } from '../../../../../components/common/Div';
import { closeActivity } from '../../../../../utils/api-service';
import { changeActivityDetailsValue } from '../../../../../actions/ActivityDetails';
import { ACTIVITY_ID, ACTIVITY_CHECK_FLOW } from '../../../../../reducer/ActivityDetails';
import { changeBaseInfo } from '../../../../../actions/CreateActivity/baseInfo';
import { ACTIVITY_TYPE } from '../../../../../reducer/ActivityManagement/baseInfo';
import { SINGLE_LINE_OMITTED, FLEX_CENTER_CENTER } from '../../../../../consts/css';

// const Step = Steps.Step;

class ListInfo extends Component {
  static displayName = 'ListInfo';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(requestActivityListInfo(1, 10));
  }

  gotoCreateActivityPage = () => {
    const { routeHistory, dispatch } = this.props;
    dispatch(changeCurrentStep(CURRENT_STEP, 0));
    dispatch(changeBaseInfo(ACTIVITY_TYPE, 1));
    routeHistory.push(BASE_INFO);
  };

  closeActivity = (id, type) => {
    const { routeHistory, dispatch } = this.props;
    closeActivity({ id: id, type: type }).then(response => {
      const {
        status,
        data: { code, message: responseMessage },
      } = response;
      if (status === 200) {
        if (code === '0') {
          message.success('关闭成功');
          routeHistory.push(ACTIVITY_LIST);
          dispatch(requestActivityListInfo(1, 10));
        } else {
          message.error(responseMessage);
        }
        console.log(response);
      } else {
        message.error(`请求异常：状态码为：${status}`);
      }
    });

    console.log(id, type);
  };

  sendIdToDetail = id => {
    const { dispatch, routeHistory } = this.props;
    dispatch(changeActivityDetailsValue(ACTIVITY_ID, id));
    routeHistory.push(ACTIVITY_DETAILS);
  };

  sendIdToCheckFlow = id => {
    const { dispatch, routeHistory } = this.props;
    dispatch(changeActivityDetailsValue(ACTIVITY_ID, id));
    dispatch(changeActivityDetailsValue(ACTIVITY_CHECK_FLOW, true));
    routeHistory.push(ACTIVITY_DETAILS);
  };

  render() {
    const {
      shareActivityList: { pageNum = 1, pageSize = 10, list = [], total },
      dispatch,
    } = this.props;
    const data = list.map((item, index) => {
      return {
        index: index + 1 + (pageNum - 1) * 10,
        activityName: item.activityName,
        activityType: item.activityType,
        id: item.id,
        type: item.type === 1 ? '商详' : '通天塔',
        creator: item.creator,
        createTime: moment(item.createTime).format('YYYY-MM-DD hh:mm:ss'),
        startTime: moment(item.startTime).format('YYYY-MM-DD hh:mm:ss'),
        endTime: moment(item.endTime).format('YYYY-MM-DD hh:mm:ss'),
        status: item.status,
        auditStatus: item.auditStatus,
        checkFlowVo: item.checkFlowVo,
      };
    });

    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        align: 'center',
        fixed: 'left',
        width: 100,
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        align: 'center',
        fixed: 'left',
        width: 100,
        render: (text, record) => (
          <Div styleStr={`${SINGLE_LINE_OMITTED};width:100px;`}>
            <Tooltip placement="left" title={record.activityName}>
              {record.activityName}
            </Tooltip>
          </Div>
        ),
      },
      {
        title: '活动id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
        width: 100,
      },
      {
        title: '活动入口',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        width: 100,
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <Div styleStr={`${SINGLE_LINE_OMITTED};width:100px;`}>
            <Tooltip placement="left" title={record.creator}>
              {record.creator}
            </Tooltip>
          </Div>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
        width: 200,
      },
      {
        title: '活动开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        width: 200,
      },
      {
        title: '活动结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
        width: 200,
      },
      {
        title: '活动状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <Div>{record.status ? (record.status === 1 ? '正在进行' : '已经结束') : '未开始'}</Div>
        ),
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatus',
        key: 'auditStatus',
        align: 'center',
        render: (text, record) => {
          const { checkFlowMessages } = record.checkFlowVo;
          return (
            <Div>
              {checkFlowMessages.length
                ? checkFlowMessages.map(item => {
                    if (item.checkResult === 2) {
                      return (
                        <Tooltip placement="left" title={item.message} style={{ margin: '0 10px' }}>
                          审核不通过
                        </Tooltip>
                      );
                    } else if (item.checkResult === 1) {
                      return ' 审核通过 ';
                    } else if (item.checkResult === 0) {
                      return ' 未审核 ';
                    }
                  })
                : record.auditStatus
                  ? record.auditStatus === 1
                    ? '审核通过'
                    : '审核不通过'
                  : '未审核'}
            </Div>
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 250,
        align: 'center',
        render: (text, record) => {
          const isClose =
            record.status === 2 ? (
              <Fragment />
            ) : (
              <Fragment>
                <Divider type="vertical" />
                <a
                  href="javascript:;"
                  onClick={() => this.closeActivity(record.id, record.activityType)}
                  style={{ cursor: 'pointer' }}
                >
                  关闭
                </a>
              </Fragment>
            );
          const isCheckFlow = record.checkFlowVo.ifCheck ? (
            record.auditStatus ? (
              <Fragment />
            ) : (
              <Fragment>
                <Divider type="vertical" />
                <Div onClick={() => this.sendIdToCheckFlow(record.id)}>
                  <span style={{ color: '#40A9FF', cursor: 'pointer' }}>审批</span>
                </Div>
              </Fragment>
            )
          ) : (
            <Fragment />
          );

          return (
            <Div styleStr={FLEX_CENTER_CENTER}>
              <Div onClick={() => this.sendIdToDetail(record.id)}>
                <span style={{ color: '#40A9FF', cursor: 'pointer' }}>查看分享数据详情</span>
              </Div>
              {isClose}
              {isCheckFlow}
            </Div>
          );
        },
      },
    ];

    return (
      <Fragment>
        <Card style={{ marginTop: '10px' }}>
          <Button
            type="primary"
            style={{ margin: '10px' }}
            onClick={() => this.gotoCreateActivityPage()}
          >
            新建活动
          </Button>
          <Table
            columns={columns}
            dataSource={data}
            onChange={this.handleTableChange}
            rowKey={record => record.id}
            scroll={{ x: 1800 }}
            pagination={{
              onChange: (pageNo, pageSizes = 10) => {
                dispatch(requestActivityListInfo(pageNo, pageSizes));
              },
              current: pageNum,
              pageSize: pageSize,
              total: total,
              showQuickJumper: true,
            }}
          />
        </Card>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps)(ListInfo);

function mapStateToProps(state) {
  return {
    routeHistory: _.get(state, 'config.routeHistory', {}),
    shareActivityList: _.get(state, 'activityList.shareActivityList', []),
  };
}
