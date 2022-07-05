<script lang="ts" setup>
import { bgColorKey, IBgcolor } from '@/types/provideKey';

// 使用 as 类型解决undefined
const { bgColor, setBgColor } = inject(bgColorKey) as IBgcolor;
console.log(bgColor, '💛💙 Son');
</script>

<template>
  <div class="container">son</div>

  <button
    class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700 border-none cursor-pointer"
    @click="setBgColor('springgreen')"
  >
    change
  </button>
</template>

<style scoped lang="scss"></style>
