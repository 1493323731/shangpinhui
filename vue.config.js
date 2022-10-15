module.exports = {
  // 丢弃map文件(map文件用于打包后映射代码出错的位置)
  productionSourceMap: false,
  productionSourceMap: false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
};
