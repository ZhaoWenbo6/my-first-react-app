/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-17 17:46:07
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-17 18:10:24
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../Div';
import { Radio, Button, Icon, Card } from 'antd';
import Coupon from '../Coupon';
import JBean from '../JBean';
import { MARGIN_TEN_ZERO } from '../../../consts/css';
import _ from 'lodash';
import { updateRewardInfo } from '../../../actions/CreateActivity/rewardInfo';
import { JBEAN_TYPE } from '../../../consts/const';
import { MODULE_JBEAN, MODULE_COUPON } from '../../../consts/module';
import PopJBean from '../PopJBean';

const RadioGroup = Radio.Group;

class RewardType extends Component {
  static displayName = 'RewardType';

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = event => {
    const { dispatch, domIndex, rewardPerson } = this.props;
    const {
      target: { value },
    } = event;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        updateList: value === JBEAN_TYPE ? MODULE_JBEAN : MODULE_COUPON,
        option: 'update',
      })
    );
  };

  deleteItem = () => {
    const { dispatch, domIndex, rewardPerson } = this.props;
    dispatch(
      updateRewardInfo({
        rewardPerson: rewardPerson,
        domIndex: domIndex,
        option: 'delete',
      })
    );
  };

  render() {
    const { itemInfo, rewardPerson, domIndex, disabled } = this.props;
    const arr = [
      {
        title: 'Coupon',
        content: (
          <Coupon
            itemInfo={itemInfo}
            domIndex={domIndex}
            rewardPerson={rewardPerson}
            disabled={disabled}
          />
        ),
      },
      {
        title: 'PopJBean',
        content: (
          <PopJBean
            itemInfo={itemInfo}
            domIndex={domIndex}
            rewardPerson={rewardPerson}
            disabled={disabled}
          />
        ),
      },
      {
        title: 'JBean',
        content: (
          <JBean
            itemInfo={itemInfo}
            domIndex={domIndex}
            rewardPerson={rewardPerson}
            disabled={disabled}
          />
        ),
      },
    ];
    const arrIndex = itemInfo.rewardType === 2 ? 1 : itemInfo.rewardType === 5 ? 2 : 0;
    return (
      <Card style={{ width: 850, position: 'relative', marginBottom: '10px' }}>
        {disabled ? (
          <Fragment />
        ) : (
          <Button
            disabled={rewardPerson ? false : domIndex ? false : true}
            style={{ position: 'absolute', right: '10px' }}
            onClick={() => this.deleteItem()}
          >
            <Icon type="delete" />
          </Button>
        )}
        <Div>
          <RadioGroup
            onChange={event => this.onChange(event)}
            value={itemInfo.rewardType}
            disabled={disabled}
          >
            <Radio value={4}>优惠券</Radio>
            <Radio value={5}>京豆</Radio>
          </RadioGroup>
        </Div>
        <Div styleStr={MARGIN_TEN_ZERO}>{arr[arrIndex].content}</Div>
      </Card>
    );
  }
}

export default connect(mapStateToProps)(RewardType);

function mapStateToProps(state) {
  return {
    sharerRewardInfo: _.get(state, 'create.rewardInfo.sharerRewardInfo', []),
    recipientRewardInfo: _.get(state, 'create.rewardInfo.recipientRewardInfo', []),
  };
}
