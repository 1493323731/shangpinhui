<template>
  <div>
    <Header></Header>
    <!-- 路由出口的地方 -->
    <router-view></router-view>
    <!-- 在home,search中显示，在login,register中隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //发请求获取商品分类三级列表数据
    this.$store.dispatch("CategoryList");
  },
};
</script>

<style>
</style>
