<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <h1 class="title">火星后台管理</h1>

        <el-form-item prop="userName">
          <el-input
            type="text"
            v-model="user.userName"
            prefix-icon="el-icon-user"
            placeholder="用户名"
            clearable
          />
        </el-form-item>

        <el-form-item prop="userPwd">
          <el-input
            type="password"
            v-model="user.userPwd"
            prefix-icon="el-icon-view"
            placeholder="密码"
            clearable
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            class="btn-login"
            @click="handleLogin"
            :loading="loading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { login } from "../../api/login";
export default defineComponent({
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        userPwd: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      loading: false,
    };
  },
  methods: {
    handleLogin() {
      this.$refs["userForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          login(this.user)
            .then((res) => {
              this.$store.commit("setUserInfo", res);
              this.$store.commit("setAccessToken", res.token);

              this.$router.push({ path: "/welcome" });
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          return false;
        }
      });
    },
  },
});
</script>

<style lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fcff;

  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 0 50px 50px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px #c7c9cb4d;
    .title {
      font-size: 25px;
      line-height: 1.5;
      text-align: center;
      margin-block: 30px;
    }
    .btn-login {
      display: block;
      width: 100%;
    }
  }
}
</style>
