<template>
  <el-pagination
    class="pagination"
    :page-sizes="[10, 20, 50, 100, 200]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pager.total"
    v-model:page-size="pager.pageSize"
    v-model:current-page="pager.pageNum"
    @size-change="handleChange"
    @current-change="handleChange"
    background
  >
  </el-pagination>
</template>

<script>
import { defineComponent, getCurrentInstance } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    pager: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10,
        total: 0,
      }),
    },
  },

  setup() {
    const { proxy } = getCurrentInstance();
    const handleChange = () => {
      proxy.$emit("paginationChange", proxy.pager);
    };

    return { handleChange };
  },
});
</script>

<style lang="scss">
.pagination {
  text-align: right;
  padding: 10px 0;
}
</style>
