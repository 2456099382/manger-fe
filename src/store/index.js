/**
 * Vuex状态管理
 */

import { createStore } from "vuex";

import storage from "../utils/storage";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const state = {
  userInfo: storage.getItem("userInfo") || "",
  accessToken: storage.getItem("accessToken") || "",
  menus: storage.getItem("menus") || [],
};

export default createStore({
  state,
  mutations,
  getters,
  actions,
});
