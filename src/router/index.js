// //配置路由的地方
//引入Vue
import Vue from "vue";
//引入vue-router路由插件
import VueRouter from "vue-router";
import routes from "./routes";
//引入大仓库
import store from "@/store";
// //使用插件
Vue.use(VueRouter);
//重写push|replace,解决编程式路由跳转到当前路由多次执行报错
//先保存一份VueRouter.prototype身上的push|replace方法
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// call/apply的区别，都可以调用一次函数，篡改this，
// call传递参数用逗号隔开，apply传递参数用数组
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二、第三个参数
    //originPush：利用call修改this，变为$router
    // 第二个参数：配置对象
    // 第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有传递第二个/第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
VueRouter.prototype.Replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
// 对外暴露VueRouter类的实例
// 配置路由
let router = new VueRouter({
  //配置路由
  //路径的前面需要有/
  //路径中单词都是小写的
  //component右侧别加单引号
  //k v一致简写
  routes,
  //滚动行为
  scrollBehavior() {
    return { y: 0 };
    //y=0，代表滚动条在最上方
  },
});
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  //next()放行，next(path)放行到指定路由,
  // next(false)中断当前导航，如果url地址改变，url会重置到from路由对应的地址
  //用户登陆了才会有token,未登录一定不会有token
  let token = store.state.user.token;
  //获取用户信息
  let name = store.state.user.userInfo.name;
  if (token) {
    //如果用户已经登录了，就不能跳转到login路由
    if (to.path == "/login") {
      next("/home");
    } else {
      //登录，去的不是login
      if (name) {
        // 有用户信息
        next();
      } else {
        //没有用户信息(刷新导致数据丢失)，发请求获取用户信息再跳转
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效了，获取不到用户信息，需要重新登录
          //清除token
          await store.dispatch("userLogout");
          alert(error.message);
          next("login");
        }
      }
      next();
    }
  } else {
    //用户未登录
    //不能去交易相关、不能去支付相关、不能去个人中心
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //存储未登录时想去而没有去成的地址
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
