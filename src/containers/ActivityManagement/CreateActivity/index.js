/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:33:17
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-06 17:56:34
 * @Description: 创建活动父组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Javascript will save your soul
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button, message } from 'antd';
import { Div } from '../../../components/common/Div';
import { Title } from '../../../components/common/Title';
import _ from 'lodash';
import { CURRENT_STEP } from '../../../reducer/ActivityManagement';
import { changeCurrentStep } from '../../../actions/CreateActivity';
import { FLEX_CENTER_CENTER } from '../../../consts/css';
import { BASE_INFO, ADD_GOODS, SET_REWARDS, ACTIVITY_PREVIEW } from '../../../consts/route';

class CreateActivity extends Component {
  static displayName = 'CreateActivity';

  constructor(props) {
    super(props);
    this.state = {};
  }

  next = () => {
    const { currentStep, dispatch, routeHistory } = this.props;
    const nextStep = currentStep + 1;
    dispatch(changeCurrentStep(CURRENT_STEP, nextStep));
    routeHistory.push(routeArr[nextStep]);
  };

  prev = () => {
    const { currentStep, dispatch, routeHistory } = this.props;
    const prevStep = currentStep - 1;
    dispatch(changeCurrentStep(CURRENT_STEP, prevStep));
    routeHistory.push(routeArr[prevStep]);
  };

  render() {
    const { currentStep } = this.props;
    const titleDom = steps.filter((item, key) => key === currentStep);
    return (
      <div>
        <Steps current={currentStep}>
          {steps.map(item => <Step key={item.title} title={item.title} icon={item.icon} />)}
        </Steps>
        {titleDom[0].headerTitle !== '' ? <Title>{titleDom[0].headerTitle}</Title> : <div />}
        <Div styleStr={styleStr}>{this.props.children}</Div>
        <Div styleStr={FLEX_CENTER_CENTER}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 10px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button style={{ margin: '0 10px' }} type="primary" onClick={() => this.next()}>
              下一步
            </Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button
              style={{ margin: '0 10px' }}
              type="primary"
              onClick={() => message.success('Processing complete!')}
            >
              完成
            </Button>
          )}
        </Div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CreateActivity);

function mapStateToProps(state) {
  return {
    currentStep: _.get(state, 'create.currentStep', -1),
    routeHistory: _.get(state, 'config.routeHistory', {}),
  };
}

const styleStr = 'width: 100%; height: 100%; margin: 20px 0;';

const routeArr = [BASE_INFO, ADD_GOODS, SET_REWARDS, ACTIVITY_PREVIEW];

const Step = Steps.Step;

const steps = [
  {
    title: '创建活动',
    content: 'First-content',
    icon: 'form',
    headerTitle: '第一步：添加基本信息',
  },
  {
    title: '添加商品',
    content: 'Second-content',
    icon: 'shopping-cart',
    headerTitle: '第二步：填写业务编码',
  },
  {
    title: '设置奖励',
    content: 'Last-content',
    icon: 'pay-circle',
    headerTitle: '第三步：设置奖励信息',
  },
  {
    title: '完成创建',
    content: 'Last-content',
    icon: 'smile',
    headerTitle: '',
  },
];
