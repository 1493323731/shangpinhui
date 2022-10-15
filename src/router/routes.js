//路由配置信息
//当打包构建应用时，javaScript包会变得非常大，影响页面加载
//如果我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才加载对应组件，这样就会更高效
/* 
component: () => import('@/pages/Search')
1. import(modulePath): 动态import引入模块, 被引入的模块会被单独打包
2. 组件配置的是一个函数, 函数中通过import动态加载模块并返回, 
  初始时函数不会执行, 访问对应的路由时函数才会执行, 也就是说只有请求对应的路由路径才会请求加载单独打包的js
作用: 用于提高加载速度
*/
export default [
  {
    path: "/home",
    component: () => import("@/pages/Home"),
    meta: { show: true },
    //路由元信息，控制Header和Footer组件是否显示
  },
  {
    path: "/login",
    component: () => import("@/pages/Login"),
    meta: { show: false },
  },
  {
    path: "/register",
    component: () => import("@/pages/Register"),
    meta: { show: false },
  },
  {
    path: "/search/:keyword?",
    component: () => import("@/pages/Search"),
    meta: { show: true },
    name: "search",
  },
  {
    path: "/detail/:skuid?",
    component: () => import("@/pages/Detail"),
    meta: { show: true },
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import("@/pages/AddCartSuccess"),
    meta: { show: true },
  },
  {
    path: "/shopcart",
    component: () => import("@/pages/ShopCart"),
    meta: { show: true },
  },
  {
    path: "/trade",
    component: () => import("@/pages/Trade"),
    meta: { show: true },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      if (from.path == "/shopcart" || from.path == "/login") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/Pay",
    component: () => import("@/pages/Pay"),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == "/trade") {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: "/paysuccess",
    component: () => import("@/pages/PaySuccess"),
    meta: { show: true },
  },
  {
    path: "/center",
    component: () => import("@/pages/Center"),
    meta: { show: true },
    //二级路由组件
    children: [
      {
        path: "myorder",
        component: () => import("@/pages/Center/myOrder"),
      },
      //重定向
      {
        path: "/center",
        redirect: "/center/myorder",
      },
    ],
  },
  //重定向，在项目跑起来的时候，立马让它定向到首页
  {
    path: "*",
    redirect: "/home",
  },
];
