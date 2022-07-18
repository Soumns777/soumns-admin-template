<script lang="ts" setup>
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

// 配置element按钮文字中间是否有空格
const config = reactive({
  autoInsertSpace: false,
});
</script>

<template>
  <el-config-provider :locale="zhCn" :button="config">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
