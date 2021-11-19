<template>
  <el-menu
    router
    :collapse="collapse"
    background-color="#001529"
    text-color="#fff"
    class="lf-menu"
    :default-active="$route.path"
  >
    <tree-menu :menus="menus" />
  </el-menu>
</template>

<script>
import TreeMenu from "./TreeMenu.vue";
export default {
  name: "LyNave",
  components: {
    TreeMenu,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    menus: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.lf-menu {
  border-right: none;
  height: calc(100vh - 50px);
}
</style>
