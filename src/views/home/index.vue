<script lang="ts" setup>
import { initMenuList } from '@/services/request';
import { formatTree, generateRoute } from '@/libs/utils/utools';

const init = async () => {
  const { data: res } = await initMenuList({
    pid: 1,
  });

  type IRes = typeof res;

  console.log(generateRoute(formatTree(res)), '💙💛 初始化菜单列表数据');
};

init();
</script>

<template>
  <div>home</div>
</template>

<style scoped lang="scss"></style>
