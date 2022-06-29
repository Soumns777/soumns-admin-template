<template>
  <div
    box-border
    flex
    items-center
    justify-center
    min-h-100vh
    w="100%"
    h="100%"
  >
    <img src="@/assets/uploads/404.png" m="r120px" alt="404" />
    <div flex flex-col>
      <h2 m="b30px" text-60px font-bold color="#434e59">404</h2>
      <h4 m="b20px" text-19px color="#848587">抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
      <el-button w="100px" type="primary" @click="router.push({ name: 'home' })"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
