<style lang="scss">
.user-manager {
  .query-form {
    margin-bottom: 30px;
  }
  .base-table {
    background-color: #fff;
    padding: 20px;
    height: calc(100vh - 200px);
    .action-btn {
      margin-bottom: 20px;
    }
  }
}
</style>

<template>
  <div class="user-manager">
    <div class="query-form">
      <el-form inline :model="state.user" ref="targetForm">
        <el-form-item label="用户Id" prop="userId">
          <el-input placeholder="请输入用户Id" v-model="state.user.userId" />
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input placeholder="请输入用户名" v-model="state.user.userName" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="state.user.state" placeholder="请选择用户状态">
            <el-option
              v-for="item in state.stateOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleFormSearch">查询</el-button>
          <el-button type="default" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action-btn">
        <el-button type="primary" @click="handleAddUser">新增用户</el-button>
        <el-button type="danger" @click="handlePatchDel">批量删除</el-button>
      </div>
      <el-table
        :data="state.userList"
        :height="state.tableHeight"
        v-loading="state.loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          :selectable="checkSelectable"
        ></el-table-column>
        <el-table-column
          v-for="column in state.columns"
          v-bind="column"
          :key="column.label"
        >
        </el-table-column>
        <el-table-column prop="action" label="操作" width="150">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="mini"
              @click="handleOperator('edit', row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              :disabled="row.state == 2"
              @click="handleOperator('del', row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagetion">
        <pagination
          :pager="state.pager"
          @paginationChange="handlePaginationChange"
        />
      </div>
    </div>
    <add-user-dialog ref="addUser" @on-update="handleGetData" />
  </div>
</template>

<script>
import {
  defineComponent,
  reactive,
  onMounted,
  nextTick,
  onUnmounted,
  getCurrentInstance,
  ref,
  toRefs,
} from "vue";

import {
  getUserList,
  deleteUser,
  userOperate,
  getPermissionList,
} from "@/api/home/userManager/index.js";

import Pagination from "@/components/pagination/index.vue";
import AddUserDialog from "./AddUserDialog.vue";

import { formatDate } from "../../../utils/index";

export default defineComponent({
  name: "userManager",
  components: {
    Pagination,
    AddUserDialog,
  },
  setup() {
    const { proxy } = getCurrentInstance();

    const { $message, $messageBox } = proxy;

    const state = reactive({
      user: {
        userId: "",
        userName: "",
        state: "1",
      },

      columns: [
        {
          prop: "userId",
          label: "用户Id",
        },
        {
          prop: "userName",
          label: "用户名",
        },

        {
          prop: "userEmail",
          label: "用户邮箱",
        },
        {
          prop: "role",
          label: "用户角色",
          formatter(row) {
            return {
              0: "管理员",
              1: "普通用户",
            }[row.role];
          },
        },
        {
          prop: "state",
          label: "用户状态",
          formatter(row) {
            return {
              1: "在职",
              2: "离职",
              3: "试用期",
            }[row.state];
          },
        },
        {
          prop: "createTime",
          label: "注册时间",
          formatter(row) {
            return formatDate(new Date(row.createTime));
          },
        },
        {
          prop: "lastLoginTime",
          label: "最后登录时间",
          formatter(row) {
            return formatDate(new Date(row.lastLoginTime));
          },
        },
      ],
      userList: [],
      pager: {
        pageNum: 1,
        pageSize: 10,
      },
      stateOptions: [
        {
          value: "0",
          label: "所有",
        },
        {
          value: "1",
          label: "在职",
        },
        {
          value: "2",
          label: "离职",
        },
        {
          value: "3",
          label: "试用期",
        },
      ],
      loading: false,
    });
    //获取数据
    const handleGetData = async (params) => {
      try {
        state.loading = true;
        const res = await getUserList({
          ...state.pager,
          ...params,
          ...state.user,
        });
        state.userList = res.list;
        state.pager = { ...res.data.page };

        setTimeout(() => {
          state.loading = false;
        }, 500);
      } catch (error) {
        throw new Error(error.msg);
      }
    };
    handleGetData();

    //表格高度自适应
    state.tableHeight = 0;

    const resize = () => {
      const maxHeight = window.innerHeight - 274 - 50;
      state.tableHeight = maxHeight;
    };

    onMounted(() => {
      nextTick().then(() => {
        resize();
      });
      window.addEventListener("resize", resize);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", resize);
    });
    //表格高度自适应

    // 表格搜索
    const handleFormSearch = () => {
      handleGetData();
    };

    // 删除多个用户
    state.checkUserIdArr = reactive([]);

    const handleSelectionChange = (list) => {
      state.checkUserIdArr = list.map((item) => {
        return item.userId;
      });
    };

    const handlePatchDel = async () => {
      if (state.checkUserIdArr.length <= 0) {
        $message.warning("当前未选择用户");
        return;
      }

      try {
        await $messageBox.confirm("确认删除?", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        await deleteUser({ userIds: [...state.checkUserIdArr] });
        handleGetData();
        $message.success("删除成功");
      } catch (error) {
        $message.info("取消删除");
      }
    };
    // 新增用户
    const handleAddUser = () => {
      proxy.$refs["addUser"].handleInit("新增用户");
    };

    //重置表单
    const handleReset = () => {
      proxy.$refs["targetForm"].resetFields();
      handleGetData();
    };

    // 表格操作
    const handleOperator = async (type, row) => {
      if (type === "edit") {
        proxy.$refs["addUser"].handleInit("编辑用户", row, "edit");
      } else if (type === "del") {
        try {
          await $messageBox.confirm("确认删除?", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          });
          await deleteUser({ userIds: [row.userId] });
          handleGetData();
          $message.success("删除成功");
        } catch (error) {
          $message.info("取消删除");
        }
      }
    };
    //分页
    const handlePaginationChange = (page) => {
      handleGetData(page);
    };

    const checkSelectable = (row) => {
      return row.state != 2;
    };

    return {
      state,
      checkSelectable,
      handleFormSearch,
      handleReset,
      handlePaginationChange,
      handleSelectionChange,
      handlePatchDel,
      handleOperator,
      handleAddUser,
      handleGetData,
    };
  },
});
</script>
