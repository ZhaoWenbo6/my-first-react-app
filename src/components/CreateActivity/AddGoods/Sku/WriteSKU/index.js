/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-17 10:44:35
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-17 15:30:48
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../../common/Div';
import { Input, Upload, Button, Icon, message, notification } from 'antd';
// import reqwest from 'reqwest';
import _ from 'lodash';
import { checkSkuId } from '../../../../../utils/api-service';
import { RESPONSE_CODE_ZERO, RESPONSE_CODE_FOUR } from '../../../../../consts/api';
import { changeAddGoods } from '../../../../../actions/CreateActivity/addGoods';
import {
  WRITE_BIZIDS,
  SKU_FILE,
  IS_RESPONSE,
} from '../../../../../reducer/ActivityManagement/addGoods';

const { TextArea } = Input;

class WriteSKU extends Component {
  static displayName = 'WriteSKU';

  constructor(props) {
    super(props);
    this.state = {};
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleChange = event => {
    const { dispatch } = this.props;
    event.persist();
    const { value } = event.target;
    dispatch(changeAddGoods(IS_RESPONSE, false));
    dispatch(changeAddGoods(WRITE_BIZIDS, value));
    dispatch(changeAddGoods(SKU_FILE, []));
    this.emitChangeDebounced(event);
  };

  emitChange = event => {
    const { value } = event.target;
    const { dispatch, startTime, endTime } = this.props;
    checkSkuId({ skuIds: value, startDate: startTime, endDate: endTime }).then(response => {
      dispatch(changeAddGoods(IS_RESPONSE, true));
      if (response.status === 200) {
        const { code, message: responseMessage, result } = response.data;
        if (code === RESPONSE_CODE_ZERO) {
          dispatch(changeAddGoods(IS_RESPONSE, true));
          dispatch(changeAddGoods(WRITE_BIZIDS, value));
          message.success('输入的skuId均有效');
        } else if (code === RESPONSE_CODE_FOUR) {
          const pop = result.pop ? result.pop : null;
          const activityFails = result.activityFails ? result.activityFails : null;
          const skusNotSelf = result.skusNotSelf ? result.skusNotSelf : null;
          notification.open({
            message: responseMessage,
            description: (
              <Div>
                {pop ? <Div styleStr={'color:red'}>非自营sku:{pop.join()}</Div> : <Fragment />}
                {activityFails ? (
                  <Div styleStr={'color:red'}>sku正在参加其他活动:{activityFails.join()}</Div>
                ) : (
                  <Fragment />
                )}
                {skusNotSelf ? (
                  <Div styleStr={'color:red'}>不是自己管理的sku:{skusNotSelf.join()}</Div>
                ) : (
                  <Fragment />
                )}
              </Div>
            ),
          });
          dispatch(changeAddGoods(IS_RESPONSE, false));
        } else {
          message.error(responseMessage);
          dispatch(changeAddGoods(IS_RESPONSE, false));
        }
      } else {
        message.error('网络连接失败');
      }
    });
  };

  render() {
    const { skuFile, dispatch, writeBizids } = this.props;
    const props = {
      onRemove: () => {
        dispatch(changeAddGoods(SKU_FILE, []));
      },
      beforeUpload: (file, fileList) => {
        if (file.type !== 'text/plain') {
          message.error('请上传txt格式的文件');
          dispatch(changeAddGoods(SKU_FILE, []));
        } else {
          if (fileList.length > 1) {
            fileList = fileList.splice(0, 1);
            dispatch(changeAddGoods(SKU_FILE, fileList));
          } else {
            dispatch(changeAddGoods(SKU_FILE, fileList));
          }
          dispatch(changeAddGoods(WRITE_BIZIDS, ''));
        }
        return false;
      },
      fileList: skuFile,
    };

    return (
      <Div>
        <TextArea
          rows={4}
          value={writeBizids}
          placeholder="请输入SKU编号，多个id用英文分割符隔开"
          onChange={event => this.handleChange(event)}
        />
        <div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择文件
            </Button>
          </Upload>
        </div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(WriteSKU);

function mapStateToProps(state) {
  return {
    skuFile: _.get(state, 'create.addGoods.skuFile', []),
    writeBizids: _.get(state, 'create.addGoods.writeBizids', []),
    startTime: _.get(state, 'create.baseInfo.startTime', 0),
    endTime: _.get(state, 'create.baseInfo.endTime', 0),
  };
}
