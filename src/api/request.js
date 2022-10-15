//对axios进行二次封装
import axios from "axios";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
//引入大仓库
import store from "@/store";
//利用axios对象的方法create,去创建一个axios实例
const requests = axios.create({
  baseURL: "/api", //基础路径，自动在路径中添加api
  timeout: 5000, //请求超时时间
});
// 请求拦截器，在发请求之前，请求拦截器可以检测到
//在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    //发请求前在请求头上添加一个字段userTempId(不能乱添加，该字段为后台规定好的)
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  if (store.state.user.token) {
    //发请求前将token带给服务器
    config.headers.token = store.state.user.token;
  }
  //进度条开始
  nProgress.start();
  return config;
  // config：配置对象，对象里面有一个属性很重要，headers请求头
});
// 响应拦截器
requests.interceptors.response.use(
  (res) => {
    // 响应成功的回调函数，服务器相应数据回来后，
    // 响应拦截器可以检测到，可以做一些事情
    //进度条结束
    nProgress.done();
    return res.data;
  },
  (error) => {
    //响应失败的回调函数
    return Promise.reject(new Error("faile"));
  }
);

export default requests;
// module.exports=//默认暴露，import时不用加{}
