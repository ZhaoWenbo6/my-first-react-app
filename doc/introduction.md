分享有礼二期介绍

## 目录结构

* src

```shell
├── action #业务逻辑
├── components #组件
├── config #配置
├── consts #常量
├── containers #容器组件
├── index.js #入口
├── image #图片
├── mock 
├── reducer #状态树
├── tableModule
├── tasks # 初始化流程
└── utils # 工具库
```

* component

```shell
├── CreateActivity #创建活动组件
│   ├── ActivityPreview #活动预览
│   ├── AddGoods #增加商品
│   ├── BaseInfo #基础信息
│   └── SetReward #设置奖励
├── common #通用组件
│   ├── BaseInfo
│   ├── Coupon
│   ├── DateRange
│   ├── DateRanges
│   ├── DragPanel
│   ├── Div
│   ├── GoodsCodes
│   ├── JBean
│   ├── Logo
│   ├── PopJBean
│   ├── RewardRule
│   ├── Title
│   └── RewardType
├── CreateActivity #导航组件
├── PageBreadcrumb
├── PageFooter
└── PageHeader #模板相关的组件
```

* util (必须是纯函数)

```shell
├── actionHelper.js 
├── api-schema.js #axios请求
├── api-service.js #axios服务
├── AppError.js
├── array.js #数组处理
├── config.js #环境变量
├── cookie.js #cookie操作
├── reducePromise
├── reducerHelper
├── reducerPromise.js
├── registerServiceWorker.js
└── spliceUrl.js # url拼接
```

* routes

```shell
├── activity.js #活动列表
├── create.js #创建活动
├── data.js #数据看板
├── index.js #主路由
├── loading.js #加载模块
└── tips.js #分享语
```

* reducer

```shell
├── ActivityDetails #活动详情
├── ActivityList #活动列表
├── ActivityManagement #活动管理
│   ├── addGoods #增加商品
│   ├── baseInfo #基本信息
│   ├── index
│   ├── rewardInfo #设置奖励
├── config
├── index #state树
└── user #用户信息
```

## 组件

```shell
├── Alert
│   ├── Alert.js
│   ├── alert.scss
│   └── index.js
```

* 命名

> 组件命名均以驼峰命名法，且首字符大写，以文件夹为一个index.js组件.
> css命名最好以BEM命名法。
> 函数命名为驼峰命名法。

## 如何去写一个组件

* 先根据业务在route下编写路由
* 然后在containers下编写容器型组件
* 然后在components下编写展示型组件
* 将所有的业务逻辑抽到action当中
* 编写reducer状态树

## 如何写css

* 项目内采用`css-in-js`写法，选择[styled-components](https://github.com/styled-components/styled-components)第三方库

```javascript
import styled from 'styled-components';

export const Div = styled.div`
  ${props => props.styleStr};
`;

```


## State结构

```javascript
{
  create: create, //创建活动
  config: config, //配置信息
  user: user, //用户信息
  activityList: activityList, //活动列表
  activityDetails: ActivityDetails, //活动详情
}
```

