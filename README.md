# 尚品汇

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### 项目描述

尚品汇是一个电商平台，可以登陆注册账号，搜索查找商品，查看商品详情，将商品加入购物车，在购物车结算商品，核对并提交订单信息，进行支付，查看订单详情等

### 技术栈

vue,vue route,vuex,vue cli,axios

### 技术实现

1.二次封装 axios,统一管理项目 api 的使用；  
2.在 main.js 中引入项目 api 文件并绑定到 Vue 原型对象上，方便在组件中直接发请求获取数据  
3.使用路由元信息控制全局组件展示与隐藏  
4.重写 push 与 replace 方法，解决编程式导航跳转到当前路由多次执行抛出警告错误的问题  
5.vuex 模块式开发，方便数据维护  
6.使用 lodash 进行防抖(例如：用户输入最后一个关键字后再发送请求，此项目未用到）与节流(项目中使用——商品分类中，鼠标快速划过时限制触发频率；购物车中，减号按钮点击过快会导致出现负数，需要限制触发频率），提高用户体验  
7.使用 Nprogress 进度条展示数据获取进度，提高用户体验  
8.使用 mockjs 模拟数据方便进行某些内容的动态展示  
9.利用 uuid 生成临时游客身份  
10.elementUI 使用与按需引入  
11.根据服务器返回的地址字符串结合 qrcode 生成二维码  
12.将使用频率较高的片段提取为共用组件，提高代码复用率  
13.使用 props 实现数据父传子；自定义事件实现数据子给父；vuex，$bus全局事件总线实现任意组件间数据传输  
14.将post请求中非必须且为空的参数置为undefined,节约网络资源（undefined的参数不会发送给服务器）  
15.利用滚动行为使路由跳转时体验更佳   
16.利用$nextTick(在下次 dom 更新循环结束之后执行回调）监听数据，确保 v-for 遍历完成  
17.通过利用会话存储展示比较复杂的数据(传参会导致地址栏过长），利用本地存储持久化存储 token，防止页面一刷新就丢失用户数据  
18.使用路由懒加载提高加载速度

### 项目难点

1.分页器全局组件实现 2.使用导航守卫限制路由跳转(全局守卫，路由独享守卫，组件内守卫)

### 可优化的地方

目前提交订单后购物车的相应商品数据仍然存在，可以新增提交订单后自动删除购物车中相应商品数据的功能

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
