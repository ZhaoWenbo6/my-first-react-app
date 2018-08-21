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
    const arr = skusInfo[key].split(',');
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '270px' }}>
        {arr.map((item, key) => <div key={key}>{`${item}, `}</div>)}
      </div>
    );
  };

  renderSKUActivity = () => {
    const {
      data: { matchType, selectedType, selectedGoodsList, skuFile, writeBizids },
      skusInfo,
    } = this.props;
    const bizIdsArr =
      matchType === 1 ? (selectedType === 0 ? selectedGoodsList.data : writeBizids.split(',')) : [];
    if (selectedType) {
      if (bizIdsArr[0] !== '') {
        return (
          <Fragment>
            <div
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
                        {item}
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
      } else {
        return (
          <Fragment>
            <Card title={'已选文件'}>
              <div>{skuFile[0].name}</div>
            </Card>
          </Fragment>
        );
      }
    } else {
      return (
        <Fragment>
          <div style={{ display: `${bizIdsArr.length <= 20 ? 'flex' : 'none'}`, flexWrap: 'wrap' }}>
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
  };

  renderTowerActivity = () => {
    const {
      data: { writeTowerBizids },
    } = this.props;
    const bizIdsArr = writeTowerBizids.split(',');
    return (
      <Fragment>
        {/*<Card title={'已选图片'}>
          <div>{towerSkuFile[0].name}</div>
    </Card>*/}
        <div style={{ display: `${bizIdsArr.length <= 20 ? 'flex' : 'none'}`, flexWrap: 'wrap' }}>
          <Card title={`已选通天塔id：共${bizIdsArr.length}个`}>
            {bizIdsArr.map((item, key) => (
              <Card.Grid style={towerGridStyle} key={key}>
                {item}
              </Card.Grid>
            ))}
          </Card>
        </div>
        <Div styleStr={`display: ${bizIdsArr.length > 20 ? 'block' : 'none'}`}>
          <a
            href={this.state.contentURL ? this.state.contentURL : 'javascript:;'}
            download="商品文件.txt"
            onClick={
              bizIdsArr.length > 20 ? () => this.createTxtFile(bizIdsArr.map(item => item)) : null
            }
          >
            点击下载
          </a>
        </Div>
      </Fragment>
    );
  };

  render() {
    const {
      data: { matchType },
    } = this.props;
    switch (matchType) {
      case 1:
        return this.renderSKUActivity();
        break;
      case 4:
        return this.renderTowerActivity();
        break;
      default:
        break;
    }
  }
}
export default GoodsCodes;

const gridStyle = {
  width: '120px',
  textAlign: 'center',
};

const towerGridStyle = {
  width: '100%',
  textAlign: 'center',
};
