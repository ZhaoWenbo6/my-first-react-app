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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Div } from '../../../../common/Div';
import { Input, Upload, Button, Icon, message } from 'antd';
// import reqwest from 'reqwest';
import _ from 'lodash';
import { checkSkuId } from '../../../../../utils/api-service';
import { RESPONSE_CODE_ZERO } from '../../../../../consts/api';
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
    const { dispatch } = this.props;
    checkSkuId({ skuIds: value }).then(response => {
      dispatch(changeAddGoods(IS_RESPONSE, true));
      if (response.status === 200) {
        const { code, message: responseMessage } = response.data;
        if (code === RESPONSE_CODE_ZERO) {
          dispatch(changeAddGoods(WRITE_BIZIDS, value));
          message.success('输入的skuId均有效');
        } else {
          dispatch(changeAddGoods(WRITE_BIZIDS, ''));
          message.error(responseMessage);
        }
      } else {
        message.error('网络连接失败');
        dispatch(changeAddGoods(WRITE_BIZIDS, ''));
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
  };
}
