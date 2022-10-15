import Vue from "vue";
import App from "./App.vue";
//引入路由
import router from "@/router";
// 引入仓库
import store from "@/store";
Vue.config.productionTip = false;
//引入统一接口api文件夹中全部请求函数
import * as API from "@/api";
//引入表单校验插件
import "@/plugins/validate";
//引入MockServer.js----mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";
//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
//注册全局组件
// 第一个参数 组件名字  第二个参数 哪个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
//引入ElementUI
import { MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册仓库
  store,
}).$mount("#app");
