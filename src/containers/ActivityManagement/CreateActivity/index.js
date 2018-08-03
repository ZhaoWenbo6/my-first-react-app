/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-06 15:33:17
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-22 22:12:16
 * @Description: 创建活动父组件
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Steps, Button } from 'antd';
import { Div } from '../../../components/common/Div';
import { Title } from '../../../components/common/Title';
import _ from 'lodash';
import { CURRENT_STEP } from '../../../reducer/ActivityManagement';
import {
  changeCurrentStep,
  checkFirstData,
  splicCreateActivityParameters,
  checkSecondData,
  checkThirdData,
} from '../../../actions/CreateActivity';
import { FLEX_CENTER_CENTER } from '../../../consts/css';
import { BASE_INFO, ADD_GOODS, SET_REWARDS, ACTIVITY_PREVIEW } from '../../../consts/route';
import { STEPS } from '../../../consts/steps';

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

  onClickHandle = () => {
    const { dispatch } = this.props;
    dispatch(splicCreateActivityParameters());
  };

  checkButtonStatus = () => {
    const { currentStep, baseInfo, addGoods, rewardInfo } = this.props;
    let isDisable = true;
    switch (currentStep) {
      case 0:
        isDisable = checkFirstData(baseInfo);
        break;
      case 1:
        isDisable = checkSecondData(addGoods);
        break;
      case 2:
        isDisable = checkThirdData(rewardInfo);
        break;
      default:
        break;
    }
    return !isDisable;
  };

  render() {
    const { currentStep } = this.props;
    const titleDom = STEPS.filter((item, key) => key === currentStep);
    return (
      <div>
        <Steps current={currentStep}>
          {STEPS.map(item => <Step key={item.title} title={item.title} icon={item.icon} />)}
        </Steps>
        {titleDom[0].headerTitle !== '' ? <Title>{titleDom[0].headerTitle}</Title> : <div />}
        <Div styleStr={styleStr}>{this.props.children}</Div>
        <Div styleStr={FLEX_CENTER_CENTER}>
          {currentStep > 0 && (
            <Button style={{ margin: '0 10px' }} onClick={() => this.prev()}>
              上一步
            </Button>
          )}
          {currentStep < STEPS.length - 1 && (
            <Button
              disabled={this.checkButtonStatus()}
              style={{ margin: '0 10px' }}
              type="primary"
              onClick={() => this.next()}
            >
              下一步
            </Button>
          )}
          {currentStep === STEPS.length - 1 && (
            <Button
              style={{ margin: '0 10px' }}
              type="primary"
              onClick={() => this.onClickHandle()}
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
    routeHistory: _.get(state, 'config.routeHistory', {}),
    currentStep: _.get(state, 'create.currentStep', -1),
    baseInfo: _.get(state, 'create.baseInfo', {}),
    addGoods: _.get(state, 'create.addGoods', {}),
    rewardInfo: _.get(state, 'create.rewardInfo', {}),
  };
}

const styleStr = 'width: 100%; height: 100%; margin: 20px 0;';

const routeArr = [BASE_INFO, ADD_GOODS, SET_REWARDS, ACTIVITY_PREVIEW];

const Step = Steps.Step;
