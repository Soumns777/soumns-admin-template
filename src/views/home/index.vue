<script lang="ts" setup>
import { initMenuList } from '@/services/request';
import { formatTree, generateRoute } from '@/libs/utils/utools';
import useAuth from '@/store/modules/auth';
import { useRouter } from 'vue-router';
const router = useRouter();

const Auth = useAuth();

const init = async () => {
  const { data: res } = await initMenuList({
    pid: 1,
  });

  Auth.setAuthRoutes(generateRoute(formatTree(res)));

  console.log(generateRoute(formatTree(res)), '💙💛 generateRoute');
};

onMounted(() => {
  init();
});

const { authBtns, authRoutes } = storeToRefs(Auth);
// console.log(authRoutes, '💙💛 用户路由权限');
</script>

<template>
  <div>
    home

    <button @click="router.push({ name: 'test' })">theme</button>
  </div>
</template>

<style scoped lang="scss"></style>
