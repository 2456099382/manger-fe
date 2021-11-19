<template>
  <div class="basic-layout">
    <div class="nav-side" :style="{ width: computeWidth }">
      <!-- 系统logo -->
      <div class="logo">
        <img src="../../assets/logo.png" alt="" v-show="!isCollapse" />
        <span class="name" v-show="!isCollapse">Manager</span>
        <div class="toggle-btn" @click="isCollapse = !isCollapse">
          <i class="el-icon-s-fold"></i>
        </div>
      </div>
      <!-- 左侧导航栏 -->
      <lf-nav :collapse="isCollapse" :menus="menuList"></lf-nav>
    </div>
    <div class="content-right" :style="{ marginLeft: computeWidth }">
      <div class="nav-top">
        <div class="brea-view">
          <crumbs />
        </div>
        <div class="user">
          <div class="user-info">
            <el-badge class="notice" :is-dot="noticeCount > 0 ? true : false">
              <i class="el-icon-bell"></i>
            </el-badge>
            <el-dropdown class="drag-down" @command="handleCommand">
              <span class="user-name" style="cursor: pointer">{{
                userInfo && userInfo.userName
              }}</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="email"
                    >邮箱:
                    {{ userInfo && userInfo.userEmail }}</el-dropdown-item
                  >
                  <el-dropdown-item command="quit">退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div class="wrapper">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import LfNav from "./lf-nav/index.vue";
import Crumbs from "./Crumbs/index.vue";

import { getLeaveCount } from "../../api/home";

export default defineComponent({
  name: "Home",
  components: {
    LfNav,
    Crumbs,
  },
  computed: {
    computeWidth() {
      return this.isCollapse ? "64px" : "200px";
    },
  },
  data() {
    return {
      isCollapse: false,
      noticeCount: 0,
      userInfo: this.$store.state.userInfo,
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
    this.getNotice();
  },
  methods: {
    handleCommand(command) {
      if (command === "quit") {
        this.$store.commit("setUserInfo", "");
        this.$store.commit("setAccessToken", "");

        this.userInfo = null;
        this.$router.push({ path: "/login" });
      }
    },

    async getNotice() {
      try {
        const data = await getLeaveCount();
        this.noticeCount = data;
      } catch (error) {
        throw new Error(error);
      }
    },
    async getMenuList() {
      try {
        await this.$store.dispatch("changeMenus");
        this.menuList = this.$store.getters.getMenus;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.basic-layout {
  position: relative;
  .nav-side {
    position: fixed;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    transition: width 0.5s;
    overflow: hidden;
    .logo {
      display: flex;
      align-items: center;
      height: 50px;
      font-size: 18px;
      img {
        width: 32px;
        height: 32px;
        margin: 0 16px;
      }
      .toggle-btn {
        cursor: pointer;
        margin-left: 20px;
      }
    }
  }
  .content-right {
    margin-left: 200px;
    transition: 0.5s;
    .nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
      .user-info {
        line-height: 15px;
        margin-top: 16px;
        .notice {
          margin-right: 10px;
        }
      }
    }
    .wrapper {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
    }
  }
}
</style>
