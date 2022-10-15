import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
import { getUUID } from "@/utils/uuid_token";
// uuid--->生成一个随机字符串
const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
const actions = {
  //获取产品信息
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit("GETGOODINFO", result.data);
    }
  },
  //将产品添加到购物车中或者更新购物车数据
  //服务器没有返回其他数据，不需要存储数据
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
};
const getters = {
  //路径导航简化的数据
  categoryView(state) {
    //考虑服务器没有返回数据的情况，如果服务器不反回数据则将其变为空对象
    return state.goodInfo.categoryView || {};
  },
  //产品信息简化的数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {};
  },
  //产品售卖属性简化的数据
  spuSaleAttrList(state) {
    //同上，为了防止报错无数据时让其为空数组
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
