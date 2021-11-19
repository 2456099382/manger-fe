<style lang="scss">
.bread-crumbs {
  span {
    line-height: 50px;
    color: #333;
  }
}
</style>

<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread-crumbs">
    <el-breadcrumb-item
      v-for="route in $route.matched"
      :key="route.path"
      :to="{ path: route.path }"
      >{{ route.meta.label }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadCrumbs",
};
</script>
