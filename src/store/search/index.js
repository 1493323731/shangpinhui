// search模块的小仓库
import { reqGetSearchInfo } from "@/api";
//state:仓库存储数据的地方
const state = {
  //search模块数据
  searchList: {},
};
//mutations:修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
//action:处理action，可以书写自己的业务逻辑，也可以处理异步
//获取search模块数据
const actions = {
  //第二个参数载荷
  async getSearchList({ commit }, params = {}) {
    let result = await reqGetSearchInfo(params);
    if (result.code == 200) {
      commit("GETSEARCHLIST", result.data);
    }
  },
};
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
  //形参state,当前仓库中的state，并非大仓库中的state
  goodList(state) {
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList;
  },
  attrsList(state) {
    return state.searchList.attrsList;
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
