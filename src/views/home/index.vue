<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus';
import SwitchDark from '@/components/switchDark/index.vue';
import { User, Lock, CircleClose, UserFilled } from '@element-plus/icons-vue';

import { ElMessage } from 'element-plus';
import { login } from '@/services/request';
import { ILogin } from '@/libs/types';
import md5 from 'js-md5';

const router = useRouter();

const formSize = $ref('default');
const ruleFormRef = $ref<FormInstance>();
const ruleForm: ILogin = reactive({
  userName: 'admin',
  password: '123',
});
const rules = reactive<FormRules>({
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur',
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      message: '请输入账号密码',
      trigger: 'blur',
    },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      //   ElMessage.success('校验成功!');

      try {
        const res = await login({
          userName: ruleForm.userName,
          password: md5(ruleForm.password),
        });

        // get access_token
        console.log(res.data?.access_token, '💙💛 access_token');

        if (res.status == '200') {
          ElMessage.success('登录成功!');
          router.push({ name: 'todoList' });
        }
      } catch (error) {}
    } else {
      console.log('💙💛 error submit!', fields?.password[0].message);

      //   ElMessage.error(fields?.password[0].message);
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<template>
  <!--   bg="[url('@/assets/uploads/login_bg.svg')]" -->
  <div class="container" p="30px" min-w-full min-h-full w="100%" h="100%">
    <SwitchDark class="dark"></SwitchDark>
    <div
      class="container-login-content"
      w="100%"
      h="100%"
      box="border"
      rounded-10px
      p="r4% l30px"
      flex
      items-center
      justify-around
    >
      <div class="container-login-content-left" w="800px">
        <img src="@/assets/uploads/login_left0.png" alt="login" w="100%" />
      </div>

      <div
        class="container-login-content-form"
        w="450px"
        h="290px"
        rounded-10px
        bg="red"
        p="50px 40px 45px"
        relative
      >
        <div
          class="form-img"
          w="202px"
          h="108px"
          absolute
          top="-55px"
          right="-75px"
        >
          <img src="@/assets/uploads/form_icon.png" alt="" />
        </div>
        <div class="form-title" flex items-center m="l20px b30px">
          <img
            src="@/assets/uploads/logo.svg"
            alt=""
            w="60px"
            h="52px"
            m="r20px"
          />
          <span class="container-text" text-42px>Soumns-Admin</span>
        </div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
          w="100%"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="ruleForm.userName"
              placeholder="账号名:admin"
              size="large"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="密码:123"
              size="large"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <div
              class="form-button"
              flex
              items-center
              justify-between
              m="t10px"
            >
              <el-button
                :icon="CircleClose"
                round
                @click="resetForm(ruleFormRef)"
                size="large"
                w="185px"
                >重置</el-button
              >
              <el-button
                :icon="UserFilled"
                round
                @click="submitForm(ruleFormRef)"
                size="large"
                type="primary"
                w="185px"
              >
                登录
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-form-item__content) {
  margin-bottom: 10px;
  margin-left: 20px;

  .el-form-item__error {
    padding-top: 8px;
    font-size: 12px;
  }
}
.container {
  background-image: url('@/assets/uploads/login_bg.svg');
  background-size: 100% 100%;
  box-sizing: border-box;
  background-color: #eeeeee;
  @include children-page();

  .dark {
    top: 5%;
    right: 5%;
    position: absolute;
  }

  .container-login-content {
    background-color: hsla(0deg, 0%, 100%, 0.8);

    .container-login-content-form {
      background-color: rgba(255, 255, 255, 0.98);
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
    }
  }
}
</style>
