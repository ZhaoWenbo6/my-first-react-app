import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Title } from '../../../components/common/Title';
import BaseInfo from '../../../components/common/BaseInfo';
import RewardRule from '../../../components/common/RewardRule';
import { getActivityDetails } from '../../../utils/api-service';
import _ from 'lodash';
import { changeActivityDetailsValue } from '../../../actions/ActivityDetails';
import {
  ACTIVITY_DETAILS,
  ACTIVITY_CHECK_FLOW,
  ACTIVITY_ID,
} from '../../../reducer/ActivityDetails';
import { message, Spin } from 'antd';
import { encodeSearchParams } from '../../../utils/spliceUrl';
import { ACTIVITY_DETAILS_EXPORT } from '../../../consts/api';
import CheckFlow from './CheckFlow';
import { Div } from '../../../components/common/Div';

class ActivityDetails extends Component {
  static displayName = 'ActivityDetails';

  constructor(props) {
    super(props);
    this.state = {
      spinning: true,
    };
  }

  componentDidMount() {
    const { activityId, dispatch } = this.props;
    getActivityDetails({ id: activityId }).then(response => {
      const {
        data: { code, message: responseMessage, result },
      } = response;
      if (code === '0') {
        dispatch(changeActivityDetailsValue(ACTIVITY_DETAILS, result));
        this.setState({ spinning: false });
      } else {
        message.error(responseMessage);
        this.setState({ spinning: true });
      }
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(changeActivityDetailsValue(ACTIVITY_ID, ''));
    dispatch(changeActivityDetailsValue(ACTIVITY_CHECK_FLOW, false));
  }

  exportData = (id, type) => {
    const params = { activityId: id, userType: type };
    window.open(
      `http://bjshare.cms.jd.${
        process.env.DEPLOY_ENV === 'master' ? 'local' : 'care'
      }${ACTIVITY_DETAILS_EXPORT}?${encodeSearchParams(params)}`
    );
  };

  render() {
    const {
      activityDetails: {
        shareRuleList = [],
        shareRewardLimit = 0,
        shareRewardLimitDay = 0,
        viewRewardLimit = 0,
        viewRewardLimitDay = 0,
        uploadOver = 0,
      },
      activityDetails = {},
      activityCheckFlow,
    } = this.props;
    const { spinning } = this.state;
    return (
      <Spin spinning={spinning}>
        <Title>1.活动基本信息</Title>
        <BaseInfo data={activityDetails} isDetails={true} />
        <Title>2.业务编号</Title>
        {uploadOver ? (
          <Div>上传中，预计5分钟后传完</Div>
        ) : (
          <a onClick={() => this.exportData(activityDetails.id, activityDetails.activityType)}>
            点击下载
          </a>
        )}
        <Title>3.奖励信息</Title>
        <RewardRule
          sharerRewardInfo={shareRuleList.filter(item => item.rewardPerson === 0)}
          recipientRewardInfo={shareRuleList.filter(item => item.rewardPerson === 1)}
          shareRewardLimit={shareRewardLimit}
          shareRewardLimitDay={shareRewardLimitDay}
          viewRewardLimit={viewRewardLimit}
          viewRewardLimitDay={viewRewardLimitDay}
          disabled={true}
        />
        {activityCheckFlow ? (
          <Fragment>
            <Title>4.审批</Title>
            <CheckFlow />
          </Fragment>
        ) : (
          <Fragment />
        )}
      </Spin>
    );
  }
}

export default connect(mapStateToProps)(ActivityDetails);

function mapStateToProps(state) {
  return {
    activityId: _.get(state, 'activityDetails.activityId', 0),
    activityDetails: _.get(state, 'activityDetails.activityDetails', 0),
    activityCheckFlow: _.get(state, 'activityDetails.activityCheckFlow', 0),
  };
}
