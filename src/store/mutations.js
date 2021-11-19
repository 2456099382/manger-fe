/**
 * Mutations
 */

import storage from "../utils/storage";

export default {
  setUserInfo: (state, userInfo) => {
    state.userInfo = userInfo;
    storage.setItem("userInfo", userInfo);
  },
  setAccessToken(state, token) {
    state.accessToken = token;
    storage.setItem("accessToken", token);
  },
  setMenus(state, payload) {
    state.menus = payload;
    storage.setItem("menus", payload);
  },
};
