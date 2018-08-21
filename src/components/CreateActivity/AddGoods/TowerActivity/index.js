import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../common/Div';
import { Input, message } from 'antd';
import { RESPONSE_CODE_ZERO, RESPONSE_CODE_THREE } from '../../../../consts/api';
import { checkTowerSkuId } from '../../../../utils/api-service';
import _ from 'lodash';
import {
  WRITE_TOWER_BIZIDS,
  // TOWER_SKU_FILE,
  IS_TOWER_RESPONSE,
} from '../../../../reducer/ActivityManagement/addGoods';
import { changeAddGoods } from '../../../../actions/CreateActivity/addGoods';

const { TextArea } = Input;

class TowerActivity extends Component {
  static displayName = 'TowerActivity';

  constructor(props) {
    super(props);
    this.state = {};
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleChange = event => {
    const { dispatch } = this.props;
    event.persist();
    const { value } = event.target;
    dispatch(changeAddGoods(IS_TOWER_RESPONSE, false));
    dispatch(changeAddGoods(WRITE_TOWER_BIZIDS, value));
    if (value !== '') {
      this.emitChangeDebounced(event);
    }
  };

  emitChange = event => {
    const { value } = event.target;
    const { dispatch, startTime, endTime } = this.props;
    const replaceValue = value.replace(/[\r\n]/g, '').trim();
    checkTowerSkuId({
      ids: replaceValue,
      startDate: startTime,
      endDate: endTime,
    }).then(response => {
      dispatch(changeAddGoods(IS_TOWER_RESPONSE, true));
      if (response.status === 200) {
        const { code, message: responseMessage, result } = response.data;
        if (code === RESPONSE_CODE_ZERO) {
          dispatch(changeAddGoods(IS_TOWER_RESPONSE, true));
          dispatch(changeAddGoods(WRITE_TOWER_BIZIDS, replaceValue));
          message.success('输入的通天塔活动id均有效');
        } else if (code === RESPONSE_CODE_THREE) {
          const shareActivityFails = result.shareActivityFails ? result.shareActivityFails : null;
          const repeatData = result.repeatData ? result.repeatData : null;
          const tongtianActivityFails = result.tongtianActivityFails
            ? result.tongtianActivityFails
            : null;
          message.warning(
            <Fragment>
              {responseMessage}，
              {shareActivityFails ? (
                <Div styleStr={'color:red; max-width:400px; font-size: 12px'}>
                  通天塔活动参与的分享有礼活动未结束:{shareActivityFails.join()}
                </Div>
              ) : (
                <Fragment />
              )}
              {repeatData ? (
                <Div styleStr={'color:red; max-width:400px; font-size: 12px'}>
                  重复的sku数据:{repeatData.join()}
                </Div>
              ) : (
                <Fragment />
              )}
              {tongtianActivityFails ? (
                <Div styleStr={'color:red; max-width:400px; font-size: 12px'}>
                  通天塔活动不合法:{tongtianActivityFails.join()}
                </Div>
              ) : (
                <Fragment />
              )}
            </Fragment>,
            5
          );
          dispatch(changeAddGoods(IS_TOWER_RESPONSE, false));
        } else {
          message.error(responseMessage);
          dispatch(changeAddGoods(IS_TOWER_RESPONSE, false));
        }
      } else {
        message.error('网络连接失败');
      }
    });
  };

  render() {
    const { writeTowerBizids } = this.props;
    // todo 暂时注释，原因为分享中心未上线
    // const props = {
    //   onRemove: () => {
    //     dispatch(changeAddGoods(TOWER_SKU_FILE, []));
    //   },
    //   beforeUpload: (file, fileList) => {
    //     if (file.size > 1 * 1024 * 1000) {
    //       message.error('请上传文件大小小于1M的txt格式文件');
    //     } else {
    //       if (
    //         ['image/gif', 'image/png', 'image/jpeg', 'image/bmp', 'image/webp'].filter(
    //           item => item !== file.type
    //         ).length === 5
    //       ) {
    //         message.error('请上传gif、png、jpeg、bmp、webp格式的文件');
    //         dispatch(changeAddGoods(TOWER_SKU_FILE, []));
    //       } else {
    //         if (fileList.length > 1) {
    //           fileList = fileList.splice(0, 1);
    //           dispatch(changeAddGoods(TOWER_SKU_FILE, fileList));
    //         } else {
    //           dispatch(changeAddGoods(TOWER_SKU_FILE, fileList));
    //         }
    //       }
    //       return false;
    //     }
    //   },
    //   fileList: towerSkuFile,
    // };

    return (
      <Div>
        <TextArea
          rows={4}
          value={writeTowerBizids}
          placeholder="多个id用英文逗号隔开"
          onChange={event => this.handleChange(event)}
        />
        {/*<div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择图片
            </Button>
          </Upload>
        </div>*/}
      </Div>
    );
  }
}

export default connect(mapStateToProps)(TowerActivity);

function mapStateToProps(state) {
  return {
    towerSkuFile: _.get(state, 'create.addGoods.towerSkuFile', []),
    writeTowerBizids: _.get(state, 'create.addGoods.writeTowerBizids', []),
    startTime: _.get(state, 'create.baseInfo.startTime', 0),
    endTime: _.get(state, 'create.baseInfo.endTime', 0),
  };
}

// const arr = [
//   {
//     title: 'First',
//     content: 'First-content',
//   },
//   {
//     title: 'Second',
//     content: 'Second-content',
//   },
//   {
//     title: 'Last',
//     content: 'Last-content',
//   },
// ];
