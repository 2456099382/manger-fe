<style lang="scss">
.role-manager {
  .base-table {
    .action-btn {
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="role-manager">
    <div class="query-form">
      <el-form :model="searchForm" inline ref="query-form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input
            placeholder="请输入菜单名称"
            v-model="searchForm.menuName"
          />
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
        :data="roleList"
        ref="search-table"
        default-expand-all
      >
        <el-table-column
          v-for="column in columns"
          v-bind="column"
          :key="column.label"
        >
        </el-table-column>
        <el-table-column prop="action" label="操作" width="280px">
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
      <div class="pagetion">
        <pagination :pager="pager" @paginationChange="handlePaginationChange" />
      </div>
    </div>

    <add-role-dialog
      ref="addMenu"
      @submit-form="handleGetData"
      :menuList="roleList"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AddRoleDialog from "./AddRoleDialog.vue";
import Pagination from "../../../components/pagination/index.vue";

import { formatDate } from "../../../utils/index.js";
import { getRoleList } from "@/api/home/roleMgs/index.js";

export default defineComponent({
  name: "roleManager",
  components: {
    AddRoleDialog,
    Pagination,
  },
  mounted() {
    this.handleGetData();
    //获取表格高度
    this.tableHeight =
      this.$refs["search-table"].$el.parentNode.offsetHeight - 130;
  },
  data() {
    return {
      loading: false,
      tableHeight: null,
      roleList: [],
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
          width: 180,
        },
        {
          label: "备注",
          prop: "remark",
          formatter(row) {
            if (row.remark) {
              return row.remark;
            }
            return "-";
          },
        },
        {
          label: "权限列表",
          prop: "menuType",
          formatter(row) {
            const val = { 1: "菜单", 2: "按钮" }[row.menuType];
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
          label: "设置权限",
          type: "primary",
          show: () => {
            return true;
          },
          click: (row) => {
            this.handleOperator("add", row);
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
        roleName: "",
      },
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleReset() {
      this.$refs["query-form"].resetFields();
      this.handleGetData();
    },
    async handleGetData(params) {
      this.loading = true;
      try {
        const { list, page } = await getRoleList({ ...this.pager, ...params });
        this.roleList = list;
        this.pager.total = page.total;
      } catch (error) {
        throw new Error(error);
      } finally {
        this.loading = false;
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
      this.$refs["addMenu"].handleInit("新增角色");
    },
    handlePaginationChange(pager) {
      this.handleGetData(pager);
    },
  },
});
</script>
