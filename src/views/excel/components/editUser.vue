<template>
  <el-drawer
    v-model="drawerVisible"
    :destroy-on-close="true"
    size="500px"
    :title="`${drawerData.title}用户`"
  >
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :disabled="drawerData.isView"
      :model="drawerData.rowData"
      label-width="100px"
    >
      <el-form-item label="用户姓名" prop="name" clearable>
        <el-input
          v-model="drawerData.rowData!.name"
          placeholder="请填写用户姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender" clearable>
        <el-select
          v-model="drawerData.rowData!.gender"
          placeholder="请选择性别"
          clearable
        >
          <el-option
            v-for="item in GENDER_TYPE"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="年龄" prop="age" clearable>
        <el-input
          v-model="drawerData.rowData!.age"
          placeholder="请填写用户年龄"
        ></el-input>
      </el-form-item>

      <el-form-item label="身份证号" prop="idCard" clearable>
        <el-input
          v-model="drawerData.rowData!.idCard"
          placeholder="请填写身份证号"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" clearable>
        <el-input
          v-model="drawerData.rowData!.email"
          placeholder="请填写邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="居住地址" prop="address" clearable>
        <el-input
          v-model="drawerData.rowData!.address"
          placeholder="请填写居住地址"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="drawerVisible = false">取消</el-button>
      <el-button
        type="primary"
        v-show="!drawerData.isView"
        @click="handleSubmit"
        >确定</el-button
      >
    </template>
  </el-drawer>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from 'vue';
import { GENDER_TYPE } from '@/libs/constant';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { formatCompleteDate } from '@/libs/formateDate';

const rules = reactive<FormRules>({
  name: [
    { required: true, message: '请填写用户姓名', trigger: 'blur' },
    { min: 2, max: 5, message: '用户姓名长度需要在3-5之间', trigger: 'blur' },
  ],
  gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
  age: [{ required: true, message: '请填写年龄', trigger: 'blur' }],
  idCard: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
  email: [{ required: true, message: '请填写邮箱', trigger: 'blur' }],
  address: [{ required: true, message: '请填写居住地址', trigger: 'blur' }],
});

interface DrawerProps {
  title: string;
  isView: boolean; // 是否可以支持查看,区分查看还是新增
  rowData?: any;
  apiUrl?: (params: any) => Promise<any>;
  getTableList?: () => Promise<any>;
}

// drawer框状态
let drawerVisible = $ref(false);
let drawerData = $ref<DrawerProps>({
  isView: false,
  title: '',
});

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps): void => {
  drawerData = params;
  drawerVisible = true;
};

const ruleFormRef = ref<FormInstance>();
// 提交数据（新增/编辑）
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return;
    try {
      if (!drawerData.apiUrl) return;

      drawerData.rowData = Object.assign(drawerData.rowData, {
        createdDate: formatCompleteDate(new Date()),
      });
      const { RESULT_CODE, RESULT_MSG } = await drawerData.apiUrl(
        drawerData.rowData
      );

      if (RESULT_CODE != '0000') {
        return ElMessage.error(RESULT_MSG);
      }

      ElMessage.success(RESULT_MSG);
      console.log(RESULT_CODE, RESULT_MSG, '💛💙 编辑用户操作成功');
      drawerData.getTableList && drawerData.getTableList();
      drawerVisible = false;
    } catch (error) {
      console.log(error, '💛💙 新增/编辑用户失败');
    }
  });
};

defineExpose({
  acceptParams,
});
</script>
