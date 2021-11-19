<style lang="scss" scoped></style>

<template>
  <el-dialog
    :title="dialog.title"
    v-model="dialog.visible"
    :width="dialog.width"
    @close="handleClose"
  >
    <el-form :model="menuForm" :label-width="100" ref="targetForm">
      <el-form-item prop="parentId" label="父级菜单">
        <el-cascader
          v-model="menuForm.parentId"
          :options="menuList"
          clearable
          :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
        />
        <span style="margin-left: 20px">不选，则默认创建一级菜单</span>
      </el-form-item>

      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="menuForm.menuType">
          <el-radio :label="1">菜单</el-radio>
          <el-radio :label="2">按钮</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="菜单名称"
        prop="menuName"
        :rules="{
          required: true,
          message: '请输入菜单名称',
          trigger: 'change',
        }"
      >
        <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称" />
      </el-form-item>

      <el-form-item
        label="菜单图标"
        prop="icon"
        v-show="menuForm.menuType === 1"
      >
        <el-input v-model="menuForm.icon" placeholder="请输入菜单图标" />
      </el-form-item>

      <el-form-item
        label="路由地址"
        prop="path"
        v-show="menuForm.menuType === 1"
      >
        <el-input v-model="menuForm.path" placeholder="请输入路由地址" />
      </el-form-item>

      <el-form-item
        label="组件路径"
        prop="component"
        v-show="menuForm.menuType === 1"
      >
        <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
      </el-form-item>

      <el-form-item
        label="菜单状态"
        prop="menuState"
        v-show="menuForm.menuType === 1"
      >
        <el-radio-group v-model="menuForm.menuState">
          <el-radio :label="1">正常</el-radio>
          <el-radio :label="2">停用</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item
        label="菜单标识"
        prop="menuCode"
        v-show="menuForm.menuType == 2"
      >
        <el-input v-model="menuForm.menuCode" placeholder="请输菜单标识" />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmitForm">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";

import { menuOperator } from "@/api/home/menuMgs/index.js";

export default defineComponent({
  name: "AddMenuDialog",
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    console.log(props);
    const { proxy } = getCurrentInstance();
    const { $message } = proxy;
    const dialog = reactive({
      visible: false,
      width: "600px",
      loading: false,
      title: "",
    });
    const menuForm = ref({
      parentId: [null],
      menuName: "",
      menuType: 1,
      icon: "",
      path: "",
      component: "",
      menuState: 1,
      menuCode: "",
    });
    const action = ref("");
    const handleInit = (title, row = {}, type = "add") => {
      dialog.title = title;
      dialog.visible = true;
      action.value = type;
      if (JSON.stringify(row) === "{}") {
        return;
      }

      // form渲染出来再赋值，防止初始值错乱
      proxy.$nextTick(() => {
        menuForm.value = { ...row };
      });
    };

    const handleClose = () => {
      dialog.visible = false;
      proxy.$refs["targetForm"].resetFields();
    };

    const handleSubmitForm = () => {
      const params = {
        ...menuForm.value,
        action: action.value,
      };
      dialog.loading = true;
      menuOperator(params)
        .then(() => {
          proxy.$emit("submitForm");
          $message.success("操作成功");
          handleClose();
        })
        .finally(() => {
          dialog.loading = false;
        });
    };

    return {
      dialog,
      menuForm,
      action,
      handleInit,
      handleSubmitForm,
      handleClose,
    };
  },
});
</script>
