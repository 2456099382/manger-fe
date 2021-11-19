<template>
  <div class="welcome">
    <div class="content">
      <h2 class="sub-title">欢迎体验</h2>
      <h1 class="title">慕课通用后台管理系统</h1>
      <p class="desc">-Vue3.0+ElementPlus+Node+mongo打造通用后台管理系统</p>
    </div>
    <div class="img"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Welcome",
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .content {
    margin-right: 150px;
    margin-top: -50px;
    .sub-title {
      font-size: 30px;
      line-height: 42px;
      color: #333;
    }
    .title {
      font-size: 40px;
      line-height: 62px;
      color: #409eff;
    }
    .desc {
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img {
    width: 347px;
    height: 438px;
    background: url("../../assets/images/welcome.png");
  }
}
</style>
