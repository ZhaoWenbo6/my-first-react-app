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
import { Card, Table, Button, Divider, message, Tooltip, Steps, Popover } from 'antd';
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

const Step = Steps.Step;

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
      } else {
        message.error(`请求异常：状态码为：${status}`);
      }
    });
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

  renderCheckMessage = (erp, checkMessage) => {
    return (
      <Div styleStr={checkMessageStr}>
        {erp}:{checkMessage}
      </Div>
    );
  };

  render() {
    const {
      shareActivityList: { pageNum = 1, pageSize = 10, list = [], total },
      dispatch,
    } = this.props;
    const data = list.map((item, index) => {
      return {
        key: index,
        index: index + 1 + (pageNum - 1) * 10,
        activityListName: item.activityName,
        activityType: item.activityType,
        id: item.id,
        type: item.type === 1 ? '商详' : item.type === 2 ? '店铺' : '通天塔',
        creator: item.creator,
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        startTime: moment(item.startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(item.endTime).format('YYYY-MM-DD HH:mm:ss'),
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
        dataIndex: 'activityListName',
        key: 'activityListName',
        align: 'center',
        fixed: 'left',
        width: 100,
        render: (text, record) => (
          <Div styleStr={`${SINGLE_LINE_OMITTED};width:100px;`}>
            <Tooltip placement="left" title={record.activityListName}>
              {record.activityListName}
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
        title: '活动类型',
        dataIndex: 'activityType',
        key: 'activityType',
        align: 'center',
        width: 100,
        render: (text, record) => (
          <Div styleStr={`${SINGLE_LINE_OMITTED};width:100px;`}>
            {record.activityType ? '自营' : 'POP'}
          </Div>
        ),
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
          const res = [];
          if (checkFlowMessages.length) {
            checkFlowMessages.forEach(item => {
              const { checkResult } = item;
              res.push(
                checkResult === 1 ? '审核通过' : checkResult === 2 ? '审核不通过' : '待审核'
              );
            });
          } else if (record.auditStatus === 1) {
            res.push('审核通过');
          } else if (record.auditStatus === 2) {
            res.push('审核不通过');
          } else if (record.auditStatus === 0) {
            res.push('待审核');
          }
          const st = (
            <Steps size="small" direction="vertical">
              {checkFlowMessages.length ? (
                checkFlowMessages.map((item, index, list) => {
                  const { checkResult, message, checkErp } = item;
                  const two =
                    list.length > 1 && index === 1 && [0, 2].includes(list[0].checkResult);
                  const status =
                    checkResult === 1
                      ? 'finish'
                      : checkResult === 2
                        ? 'error'
                        : two
                          ? 'wait'
                          : 'process';
                  const description =
                    checkResult === 1
                      ? '审核通过'
                      : checkResult === 2
                        ? `审核不通过：${message}`
                        : '待审核';
                  return (
                    <Step
                      status={status}
                      description={
                        <Div>
                          <Div>{checkErp}</Div>
                          <Div>{description}</Div>
                        </Div>
                      }
                    />
                  );
                })
              ) : (
                <Step status="wait" description="没有数据" />
              )}
            </Steps>
          );

          return record.activityType === 0 ? (
            '—'
          ) : (
            <Popover content={st}>{res[0] === '审核不通过' ? res[0] : res[res.length - 1]}</Popover>
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
            record.status === 2 ? (
              <Fragment />
            ) : record.auditStatus ? (
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
            rowKey={record => record.key}
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

const checkMessageStr = 'word-wrap:break-word';
