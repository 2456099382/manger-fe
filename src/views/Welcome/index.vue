<template>
  <h1>Welcome</h1>
  <el-link @click="$router.push({ path: '/login' })">去登陆</el-link>
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

<style lang="scss" scoped></style>
