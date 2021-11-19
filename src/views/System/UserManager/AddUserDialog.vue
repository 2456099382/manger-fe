<style lang="scss" scoped></style>

<template>
  <el-dialog
    :title="dialog.title"
    v-model="dialog.visible"
    :width="dialog.width"
  >
    <el-form :model="userForm" :label-width="100" ref="targetForm">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="用户名"
            prop="userName"
            :rules="{
              required: true,
              trigger: 'change',
              message: '请输入用户名',
            }"
          >
            <el-input
              v-model="userForm.userName"
              :disabled="action === 'edit'"
              placeholder="请输入用户名称"
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="userEmail"
            :rules="{
              required: true,
              trigger: 'change',
              message: '请输入邮箱',
            }"
          >
            <el-input
              v-model="userForm.userEmail"
              :disabled="action === 'edit'"
              type="text"
              placeholder="请输入用户邮箱"
            >
              <template #append> @qq.com </template></el-input
            >
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="mobile"
            :rules="{
              trigger: 'change',
              pattern: /1\d{10}/,
              message: '请输入正确的手机号',
            }"
          >
            <el-input v-model="userForm.mobile" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="岗位" prop="job">
            <el-input v-model="userForm.job" placeholder="请输入工作岗位" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="state">
            <el-select
              v-model="userForm.state"
              placeholder="请选择用户状态"
              style="width: 100%"
            >
              <el-option label="在职" :value="1" />
              <el-option label="离职" :value="2" />
              <el-option label="试用期" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="系统角色" prop="roleList">
            <el-select
              multiple
              v-model="userForm.roleList"
              placeholder="请选择系统角色"
              style="width: 100%"
            >
              <el-option
                v-for="item in roleListOption"
                :label="item.roleName"
                :value="item._id"
                :key="item._id"
              />
            </el-select>
          </el-form-item>
          <el-form-item
            label="所属部门"
            prop="deptId"
            :rules="{
              required: true,
              trigger: 'blur',
              message: '请选择所属部门',
            }"
          >
            <el-cascader
              v-model="userForm.deptId"
              style="width: 100%"
              :options="deptListOption"
              placeholder="请输入所属部门"
              :props="{ checkStrictly: true, label: 'deptName', value: '_id' }"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12"></el-col>
        <el-col :span="12">
          <el-form-item style="text-align: right">
            <el-button
              type="primary"
              :loading="dialog.loading"
              @click="handleSubmitForm"
              >确定</el-button
            >
            <el-button @click="handleClose">取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";

import { userOperate } from "@/api/home/userManager/index.js";
import { getAllRoleList } from "@/api/home/roleMgs/index.js";
import { getDeptList } from "@/api/home/deptMgs/index.js";

export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    const { $message } = proxy;
    const dialog = reactive({
      visible: false,
      width: "1000px",
      loading: false,
      title: "",
    });
    const userForm = ref({
      userName: "",
      userEmail: "",
      mobile: "",
      job: "",
      state: 3,
      roleList: [],
      deptId: [],
    });
    const roleListOption = ref([]);
    const deptListOption = ref([]);
    const action = ref("");
    const handleInit = (title, row = {}, type) => {
      dialog.title = title;
      dialog.visible = true;
      handleGetData();
      action.value = type;
      if (!action.value) {
        action.value = "add";
      }

      if (JSON.stringify(row) === "{}") {
        return;
      }
      // 等form表单渲染出来再进行赋值，保证初始值不错乱

      proxy.$nextTick(() => {
        userForm.value = { ...row };
      });
    };
    const handleGetData = async () => {
      dialog.loading = true;
      roleListOption.value = await getAllRoleList();
      deptListOption.value = await getDeptList();
      dialog.loading = false;
    };

    const handleClose = () => {
      dialog.visible = false;
      proxy.$refs["targetForm"].resetFields();
    };

    const handleSubmitForm = () => {
      const params = {
        ...userForm.value,
        action: action.value,
        userEmail: userForm.value.userEmail + "@qq.com",
      };
      console.log(params);
      dialog.loading = true;
      userOperate(params)
        .then(() => {
          $message.success("操作成功");
          handleClose();
          proxy.$emit("on-update");
        })
        .finally(() => {
          dialog.loading = false;
        });
    };

    return {
      dialog,
      userForm,
      action,
      handleInit,
      roleListOption,
      deptListOption,
      handleSubmitForm,
      handleClose,
    };
  },
});
</script>
