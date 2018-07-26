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
import { WRITE_BIZIDS } from '../../../../../reducer/ActivityManagement/addGoods';

const { TextArea } = Input;

class WriteSKU extends Component {
  static displayName = 'WriteSKU';

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      uploading: false,
    };
    this.emitChangeDebounced = _.debounce(this.emitChange, 1000);
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like
    this.setState({
      url: '//jsonplaceholder.typicode.com/posts/',
      method: 'post',
      processData: false,
      data: formData,
      success: () => {
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
      },
      error: () => {
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
      },
    });
  };

  handleChange = event => {
    event.persist();
    this.emitChangeDebounced(event);
  };

  emitChange = event => {
    const { value } = event.target;
    const { dispatch } = this.props;
    checkSkuId({ skuIds: value }).then(response => {
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
    const { uploading } = this.state;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      onRemove: file => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    return (
      <Div>
        <TextArea
          rows={4}
          placeholder="请输入SKU编号，多个id用英文分割符隔开"
          onChange={event => this.handleChange(event)}
        />
        <div>
          <Upload {...props}>
            <Button>
              <Icon type="upload" /> 选择文件
            </Button>
          </Upload>
          <Button
            className="upload-demo-start"
            type="primary"
            onClick={this.handleUpload}
            disabled={this.state.fileList.length === 0}
            loading={uploading}
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>
        </div>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(WriteSKU);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}
