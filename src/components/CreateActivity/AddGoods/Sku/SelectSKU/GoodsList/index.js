/*
 * @Author: Wenbo Zhao
 * @Date: 2018-07-12 17:46:09
 * @LastEditors: Wenbo Zhao
 * @LastEditTime: 2018-07-16 18:12:02
 * @Description: 
 * @Company: JD
 * @Email: zhaowenbo3@jd.com
 * @motto: Always believe that something wonderful is about to happen
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Button, Modal } from 'antd';
import { Div } from '../../../../../common/Div';
import { Title } from '../../../../../common/Title';
import { getGoodsList } from '../../../../../../utils/api-service';
import Lists from './Lists';

class GoodsList extends Component {
  static displayName = 'GoodsList';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
    };
  }

  componentDidMount() {
    getGoodsList({}).then(response => {
      this.setState({ data: response.data.result.data });
      console.log(response);
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    // const data = [
    //   {
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t6730/40/991472460/345841/40889e64/5948d795N7d01cc1e.jpg',
    //     sku: '171301',
    //     title: '华康 枕头 全棉荞麦枕 填充甜荞麦壳枕芯 高度可调节枕头',
    //   },
    //   {
    //     title: '华康 枕头 全棉荞麦枕 填充甜荞麦壳枕芯 高度可调节枕头',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t6730/40/991472460/345841/40889e64/5948d795N7d01cc1e.jpg',
    //     sku: '171301',
    //   },
    //   {
    //     title: '汉妮威 记忆棉 心形枕 旅游休闲办公U形枕 旅行办公室午休枕 8HP087013咖啡',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t6013/164/5051974696/177389/b326acfe/59685cbfN04b1167e.jpg',
    //     sku: '266615',
    //   },
    //   {
    //     title: '汉妮威 记忆棉 心形枕 旅游休闲办公U形枕 旅行办公室午休枕 8HP087012藏青',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t5839/17/6189227981/171617/4d6b1e81/59685d0aN0f6b93d1.jpg',
    //     sku: '266617',
    //   },
    //   {
    //     title: '汉妮威记忆棉定型枕初生新生儿枕头宝宝记忆枕头防偏头0-6岁8HP082805湖蓝色',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t6112/356/4981437813/158303/e4b498aa/59684b0aN8bf98930.jpg',
    //     sku: '266620',
    //   },
    //   {
    //     title: '汉妮威记忆棉太空记忆枕颈椎枕经典款B型枕 8HP0810D1',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t5932/86/5033297774/110799/48011538/59684bbdNaee36d55.jpg',
    //     sku: '266642',
    //   },
    //   {
    //     title: '睡眠博士（AiSleep）枕芯 人体工学进口乳胶儿童枕 学生乳胶枕 3-8岁宝宝',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t17248/68/2031426126/140383/ed838f68/5ae2c75cNbb9335d7.jpg',
    //     sku: '337639',
    //   },
    //   {
    //     title: '睡眠博士（AiSleep）枕芯 人体工学青少年乳胶枕 泰国乳胶护颈枕头 6-12岁',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t18232/107/2101080712/150906/3a6ca922/5ae2c9b4N941c3557.jpg',
    //     sku: '337640',
    //   },
    //   {
    //     title: '睡眠博士（AiSleep）枕芯 人体工学进口乳胶枕 青少年枕 泰国乳胶枕头 加长款 10-16岁',
    //     img:
    //       'http://img11.360buyimg.com/n2/jfs/t18091/127/2035887295/181271/4f938b53/5ae2c831N3aea0a04.jpg',
    //     sku: '337641',
    //   },
    // ];
    const { data } = this.state;
    return (
      <Div styleStr={containerStr}>
        <Lists haveCheckbox={true} dataLists={data} />
        <Title>
          <Checkbox>全选</Checkbox>
          <Button type="primary" style={{ margin: '0  10px' }} onClick={() => this.showModal()}>
            查看已选商品
          </Button>
          <Modal
            title="已选商品"
            visible={this.state.visible}
            onCancel={this.handleCancel}
            width={1040}
            footer={null}
          >
            <Lists haveCheckbox={false} dataLists={data} />
          </Modal>
        </Title>
      </Div>
    );
  }
}

export default connect(mapStateToProps)(GoodsList);

function mapStateToProps(state) {
  return {
    isAppReady: state.config.isAppReady,
  };
}

const containerStr = 'margin: 10px 0';
