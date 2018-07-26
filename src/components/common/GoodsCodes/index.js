import React, { Component, Fragment } from 'react';
import { Popover, Card } from 'antd';
import { Div } from '../Div';

class GoodsCodes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentURL: '',
    };
  }

  createTxtFile = bizIdsContent => {
    const content = bizIdsContent;
    const blob = new Blob([content]);
    this.setState({
      contentURL: URL.createObjectURL(blob),
    });
  };

  renderSKUSInfo = key => {
    const { skusInfo } = this.props;
    console.log(key, skusInfo);
    const arr = skusInfo[key].split(',');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '270px' }}>
        {arr.map((item, key) => <div key={key}>{`${item}, `}</div>)}
      </div>
    );
  };

  render() {
    const {
      data: { matchType, selectedType, selectedGoodsList },
      skusInfo,
    } = this.props;
    const bizIdsArr =
      matchType === 1 ? (selectedType === 0 ? selectedGoodsList.data : [1, 2]) : [2, 3, 4];

    return (
      <Fragment>
        <div
          className="showNum"
          style={{ display: `${bizIdsArr.length <= 20 ? 'flex' : 'none'}`, flexWrap: 'wrap' }}
        >
          <Card title={`已选商品：共${bizIdsArr.length}个`}>
            {bizIdsArr.map((item, key) => {
              if (skusInfo && skusInfo.length > 0) {
                const skuContent = this.renderSKUSInfo(key);
                return (
                  <Popover
                    content={skuContent}
                    title="包含的sku"
                    placement="topLeft"
                    trigger="hover"
                    arrowPointAtCenter
                  >
                    {item}
                  </Popover>
                );
              } else {
                return (
                  <Card.Grid style={gridStyle} key={key}>
                    {item.sku}
                  </Card.Grid>
                );
              }
            })}
          </Card>
        </div>
        <Div styleStr={`display: ${bizIdsArr.length > 20 ? 'block' : 'none'}`}>
          <a
            href={this.state.contentURL ? this.state.contentURL : 'javascript:;'}
            download="商品文件.txt"
            onClick={
              bizIdsArr.length > 20
                ? () => this.createTxtFile(bizIdsArr.map(item => item.sku))
                : null
            }
          >
            点击下载
          </a>
        </Div>
      </Fragment>
    );
  }
}
export default GoodsCodes;

const gridStyle = {
  width: '120px',
  textAlign: 'center',
};
