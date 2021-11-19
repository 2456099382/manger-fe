<style lang="scss">
.menu-manager {
  .base-table {
    .action-btn {
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="menu-manager">
    <div class="query-form">
      <el-form :model="searchForm" inline ref="query-form">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input
            placeholder="请输入菜单名称"
            v-model="searchForm.menuName"
          />
        </el-form-item>

        <el-form-item label="菜单状态" prop="menuState">
          <el-select
            placeholder="请选择菜单状态"
            v-model="searchForm.menuState"
          >
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleGetData">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action-btn">
        <el-button type="primary" @click="handleAddMenu">新建</el-button>
      </div>
      <el-table
        v-loading="loading"
        :height="tableHeight"
        :data="menuList"
        :tree-props="{ children: 'children' }"
        row-key="_id"
        ref="search-table"
        default-expand-all
      >
        <el-table-column
          v-for="column in columns"
          v-bind="column"
          :key="column.label"
        >
        </el-table-column>
        <el-table-column prop="action" label="操作" width="220">
          <template #default="{ row }">
            <template v-for="(btn, index) in btns">
              <el-button
                :key="index"
                :type="btn.type"
                size="mini"
                v-if="btn.show()"
                @click="btn.click(row)"
                >{{ btn.label }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <add-menu-dialog
      ref="addMenu"
      @submit-form="handleGetData"
      :menuList="menuList"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AddMenuDialog from "./AddMenuDialog.vue";

import { menuOperator } from "@/api/home/menuMgs/index.js";
import { formatDate } from "../../../utils/index.js";

export default defineComponent({
  name: "menuManager",
  components: {
    AddMenuDialog,
  },
  mounted() {
    this.handleGetData();
    //获取表格高度
    this.tableHeight =
      this.$refs["search-table"].$el.parentNode.offsetHeight - 100;
  },
  data() {
    return {
      loading: false,
      tableHeight: null,
      menuList: [],
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 180,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row) {
            const val = { 1: "菜单", 2: "按钮" }[row.menuType];
            return val ? val : "-";
          },
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件地址",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          formatter(row) {
            const val = { 1: "正常", 2: "停用" }[row.menuState];
            return val ? val : "-";
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row) {
            const val = formatDate(new Date(row.createTime));
            return val ? val : "-";
          },
        },
      ],
      btns: [
        {
          label: "新增",
          type: "primary",
          show: () => {
            return true;
          },
          click: (row) => {
            this.handleOperator("add", row);
          },
        },
        {
          label: "编辑",
          type: "primary",
          show: () => {
            return true;
          },
          click: (row) => {
            this.handleOperator("edit", row);
          },
        },

        {
          label: "删除",
          type: "danger",
          show: () => {
            return true;
          },
          click: (row) => {
            this.handleOperator("del", row);
          },
        },
      ],
      searchForm: {
        menuName: "",
        menuState: "",
      },
    };
  },
  methods: {
    handleReset() {
      this.$refs["query-form"].resetFields();
      this.handleGetData();
    },
    async handleGetData() {
      try {
        this.loading = true;
        await this.$store.dispatch("changeMenus");
        this.menuList = this.$store.getters.getMenus;
        this.loading = false;
      } catch (error) {
        throw new Error(error);
      }
    },
    handleOperator(type, row) {
      if (type === "del") {
        this.$confirm("确认删除菜单", "提示", {
          type: "warning",
          confirmButtonText: "确认",
          cancelButtonText: "取消",
        })
          .then(async () => {
            await menuOperator({ action: "del", _id: row._id });
            this.handleGetData();
            this.$message.success("删除成功");
          })
          .catch(() => {
            this.$message.info("取消删除");
          });
      } else {
        if (type === "edit") {
          this.$refs["addMenu"].handleInit("编辑菜单", row, type);
        } else {
          this.$refs["addMenu"].handleInit("新增菜单", {}, type);
        }
      }
    },
    // 新增菜单
    handleAddMenu() {
      this.$refs["addMenu"].handleInit("新增菜单");
    },
  },
});
</script>
