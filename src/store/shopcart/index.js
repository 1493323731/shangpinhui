import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";
const state = {
  // 购物车列表数据
  shopcartList: [],
};
const mutations = {
  GETSHOPCARTLIST(state, shopcartList) {
    state.shopcartList = shopcartList;
  },
};
const actions = {
  //获取购物车列表的数据
  async getShopCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETSHOPCARTLIST", result.data);
    }
  },
  //删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //修改购物车某一个产品的选中状态
  async UpdateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("faile"));
    }
  },
  //删除全部勾选的产品
  deleteAllCheckedCart({ dispatch, getters }) {
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let Promise =
        item.isChecked == 1
          ? dispatch("deleteCartListBySkuId", item.skuId)
          : "";
      //将每一次返回的Promise添加到数组当中
      PromiseAll.push(Promise);
    });
    //只有全部的promise都成功，返回结果才为成功
    //只要有一个失败，返回结果就为失败
    return Promise.all(PromiseAll);
  },
  //修改全部商品的选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let PromiseAll = [];
    state.shopcartList[0].cartInfoList.forEach((item) => {
      let Promise = dispatch("UpdateCheckedById", {
        skuId: item.skuId,
        isChecked,
      });
      PromiseAll.push(Promise);
    });
    return Promise.all(PromiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.shopcartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
