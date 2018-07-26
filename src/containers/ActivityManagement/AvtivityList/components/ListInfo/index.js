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
import { Card, Table, Button, Divider } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { requestActivityListInfo } from '../../../../../actions/ActivityList';
import { changeCurrentStep } from '../../../../../actions/CreateActivity';
import { CURRENT_STEP } from '../../../../../reducer/ActivityManagement';
import { BASE_INFO, ACTIVITY_DETAILS } from '../../../../../consts/route';
import { Div } from '../../../../../components/common/Div';
import { closeActivity } from '../../../../../utils/api-service';
import { changeActivityDetailsValue } from '../../../../../actions/ActivityDetails';
import { ACTIVITY_ID, ACTIVITY_CHECK_FLOW } from '../../../../../reducer/ActivityDetails';

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
    routeHistory.push(BASE_INFO);
  };

  closeActivity = (id, type) => {
    closeActivity({ id: id, type: type }).then(response => {
      console.log(response);
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
      },
      {
        title: '活动名称',
        dataIndex: 'activityName',
        key: 'activityName',
        align: 'center',
      },
      {
        title: '活动id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '活动入口',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
      },
      {
        title: '创建人',
        dataIndex: 'creator',
        key: 'creator',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'center',
      },
      {
        title: '活动开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
      },
      {
        title: '活动结束时间',
        dataIndex: 'endTime',
        key: 'endTime',
        align: 'center',
      },
      {
        title: '活动状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (text, record) => (
          <Div>{record.status ? (record.status === 1 ? '正在进行' : '已经结束') : '未开始'}</Div>
        ),
      },
      {
        title: '审核状态',
        dataIndex: 'auditStatus',
        key: 'auditStatus',
        align: 'center',
        render: (text, record) => (
          <Div>
            {record.auditStatus ? (record.auditStatus === 1 ? '审核通过' : '审核不通过') : '未审核'}
          </Div>
        ),
      },
      // {
      //   title: '审批信息',
      //   dataIndex: 'checkFlowVo',
      //   align: 'checkFlowVo',
      //   render: checkFlowVo => <Div>{checkFlowVo}</Div>,
      // },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        width: 260,
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
                  <span style={{ color: '#40A9FF' }}>审批</span>
                </Div>
              </Fragment>
            )
          ) : (
            <Fragment />
          );

          return (
            <Div>
              <Div onClick={() => this.sendIdToDetail(record.id)}>
                <span style={{ color: '#40A9FF' }}>查看分享数据详情</span>
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
            pagination={{
              onChange: (pageNo, pageSizes = 10) => {
                dispatch(requestActivityListInfo(pageNo, pageSizes));
              },
              current: pageNum,
              pageSize: pageSize,
              total: total,
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
