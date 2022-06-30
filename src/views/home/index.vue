<script lang="ts" setup>
import { initMenuList } from '@/services/request';
import { formatTree, generateRoute } from '@/libs/asyncRoutes';
import store from '@/store/index';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
  <div>
    home

    <button @click="router.push({ name: 'theme' })">theme</button>
  </div>
</template>

<style scoped lang="scss"></style>
