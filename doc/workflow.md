# 分享有礼一期项目构建及工作流

## 业务需求

> a)分享任务规则创建系统（A1）
用于创建分享plus任务及制定规则，如哪些商品参与此活动，参与用户身份限制，引单CPS等；
b)分享任务判断、记录及通知系统（A2）
对于按照规则完成分享任务的用户进行身份记录，并连接消息通知和奖励发放系统；
c)分享奖励录入及发放系统（A3）
用于确定分享方案之后，录入优惠券、京豆等信息，并收到A2指令后向用户账号发放奖励；

## 技术栈

[ant-design](https://github.com/ant-design/ant-design): react为基础的UI设计组件库
[es6](https://github.com/babel/babel): ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准
[create-react-app](https://github.com/facebook/create-react-app): 创建React应用程序，无需编译配置。
[react](https://github.com/facebook/react): 用于构建用户界面的JavaScript库
[react-router](https://github.com/ReactTraining/react-router): react声明试路由
[redux](https://github.com/reduxjs/redux): 可预测的JavaScript应用程序状态容器
[webpack](https://github.com/webpack/webpack): 打包工具

[npm](https://github.com/npm/npm): 包管理工具
[yarn](https://github.com/yarnpkg/yarn): 功能和npm类似
[axios](https://github.com/axios/axios): 用于浏览器和node.js的基于Promise的HTTP客户端
[easy-mock](https://easy-mock.com/): 模拟真实请求数据

## 开发规则

[eslint](https://github.com/eslint/eslint): 识别js编写异常
[prettier](https://github.com/prettier/prettier):是一个代码格式化工具

## Git流程

* 限制

[commitLint](https://github.com/eslint/eslint): 限制提交信息
[husky](https://github.com/prettier/prettier): 触发git的hook工具

git工作流请看思维导图

## 业务代码

> 以.pop.js为结尾的文件为商家测代码
> 以.static.js为结尾的文件为商家测代码

### 原因

> 由于登录页以及登陆之后的跳转不在前端控制，无法拿到用户权限、并根据不同用户的权限来展现不同功能，由此问题目前想到的解决办法有两种

* 第一种

> 在package.json中对应的执行脚本后使用node将不同用户的权限以变量的形式传进去，在页面中使用process.env拿到传入的变量根据变量进行区分

* 第二种

> 以不同结尾的同名文件进行编写，在打包时区分不同权限

## 编译、部署

### 打包

> npm run buildPop || npm run buildStatic

### 部署

> j-one

### CHANGELOG

[standard-version](https://github.com/conventional-changelog/standard-version): 自动生成 CHANGELOG

## 本套架构的优点

### 单页Web应用

> 单页Web应用（single page web application，SPA），就是只有一张Web页面的应用，是加载单个HTML 页面并在用户与应用程序交互时动态更新该页面的Web应用程序。

1. 集中的状态管理
2. react特有的diff算法和虚拟DOM
3. 组件化开发

### create-react-app

1. 避免项目刚开始时过于复杂的配置过程
2. eject反编译出webpack，更改项目因素中原配置文件不符合的地方。

### easy-mock 请求模拟真实数据

1. 不再时刻依赖后端开发，请求根据文档编写的模拟数据
2. 真实的请求

### ES6
1. es6更利于程序员编写和理解
2. 避免一些坑

### webpack

1. 利用打包工具帮助梳理文件的打包逻辑
2. 区分业务文件

### eslint + prettier

1. 增加js编写限制，避免编码过程中未考虑到的bug。
2. 统一编码格式，易于理解

## 本套架构的缺点

1. 路由控制

> 由于项目的入口为后端java配置，顾前端引用的react-router并不能完全发挥其作用，导致用户在某一页面刷新时会出现空页面

* 期待解决方案

> 为前端项目单独分配一台服务器，供于前端项目的部署，路由完全由前端控制

2. redux状态管理

> 由于我的疏忽导致项目工期开发紧张，其他人帮忙时redux不能很轻易的上手，导致项目后期状态管理变得复杂而繁琐。

* 期待解决方案

> 引入redux状态集中管理，避免祖先组件的状态传递。

3. 项目编译、打包、部署

>  目前是手动打包、编译、部署，流程过于繁琐，重复劳动太多

* 期待解决方案

> 引入ci自动化工具，如：gitlab-ci。

4. css样式编写统一管理

> 目前都是按照个人习惯编写css，行内、外联等方式形色各异，不利于维护

* 期待解决方案 

[styled-components](https://github.com/styled-components/styled-components): 使用ES6和CSS的最佳位来轻松设置应用程序样式，“告别”div+css构建组件，“真正的”css-in-js。