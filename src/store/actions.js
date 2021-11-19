import { getMenuList } from "../api/home/menuMgs";
export default {
  changeMenus({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await getMenuList();
        commit("setMenus", res);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  },
};
