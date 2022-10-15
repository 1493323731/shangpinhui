<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav></TypeNav>
    <ListConponent></ListConponent>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- Floor：并未在自己内部发请求，数据由父组件给予 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListConponent from "@/pages/Home/ListContainer";
import Recommend from "@/pages/Home/Recommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";
import { mapState } from "vuex";
export default {
  components: {
    ListConponent,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    //获取floor组件的数据
    this.$store.dispatch("getFloorList");
    //获取用户信息
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>