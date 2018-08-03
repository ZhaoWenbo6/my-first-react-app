/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-17 17:46:07
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-25 21:01:49
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Radio, Card, Input, Button, message } from 'antd';
import _ from 'lodash';
import { MARGIN_TEN_ZERO, FLEX_START_CENTER, FLEX_CENTER_CENTER } from '../../../../consts/css';
import { Div } from '../../../../components/common/Div';
import { ACTIVITY_LIST } from '../../../../consts/route';
import { ACTIVITY_ID } from '../../../../reducer/ActivityList';
import { ACTIVITY_CHECK_FLOW } from '../../../../reducer/ActivityDetails';
import { changeActivityDetailsValue } from '../../../../actions/ActivityDetails';
import { submitCheckFlow } from '../../../../utils/api-service';
import { requestActivityListInfo } from '../../../../actions/ActivityList';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

class RewardType extends Component {
  static displayName = 'RewardType';

  constructor(props) {
    super(props);
    this.state = {
      radioValue: 1,
      opinionStr: '',
    };
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(changeActivityDetailsValue(ACTIVITY_ID, ''));
    dispatch(changeActivityDetailsValue(ACTIVITY_CHECK_FLOW, false));
  }

  onChange = event => {
    const {
      target: { value },
    } = event;
    this.setState({ radioValue: value });
  };

  opinion = event => {
    const {
      target: { value },
    } = event;
    this.setState({ opinionStr: value });
  };

  submit = () => {
    const { radioValue, opinionStr } = this.state;
    const { routeHistory, activityId, dispatch } = this.props;
    submitCheckFlow({
      activityId: activityId,
      checkResult: radioValue,
      checkMessage: radioValue === 2 ? opinionStr : null,
    }).then(response => {
      console.log(response);
      const {
        data: { code, message: responseMessage },
        status,
      } = response;
      if (status === 200 && code === '0') {
        message.success('审批成功');
        routeHistory.push(ACTIVITY_LIST);
        dispatch(requestActivityListInfo(1, 10));
      } else {
        message.error(responseMessage);
      }
    });
  };

  render() {
    const { radioValue, opinionStr } = this.state;
    const arr = [
      { content: <Fragment /> },
      {
        content: (
          <Div styleStr={FLEX_START_CENTER}>
            <Div styleStr={'width: 100px;'}>审批意见：</Div>
            <TextArea rows={4} onChange={event => this.opinion(event)} value={opinionStr} />
          </Div>
        ),
      },
    ];
    return (
      <Card style={{ width: 850, position: 'relative', marginBottom: '10px' }}>
        <Div styleStr={FLEX_START_CENTER}>
          <Div styleStr={'width: 100px;'}>审核：</Div>
          <RadioGroup onChange={event => this.onChange(event)} value={radioValue}>
            <Radio value={1}>审批通过</Radio>
            <Radio value={2}>审批未通过</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[radioValue - 1].content}</Div>
        <Div styleStr={FLEX_CENTER_CENTER}>
          <Button type="primary" style={{ margin: '10px' }} onClick={() => this.submit()}>
            提交审批
          </Button>
        </Div>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(RewardType);

function mapStateToProps(state) {
  return {
    routeHistory: _.get(state, 'config.routeHistory', {}),
    activityId: _.get(state, 'activityDetails.activityId', 0),
    sharerRewardInfo: _.get(state, 'create.rewardInfo.sharerRewardInfo', []),
    recipientRewardInfo: _.get(state, 'create.rewardInfo.recipientRewardInfo', []),
  };
}
