<script lang="ts" setup>
import { BgColor, BgColorKey } from '@/types/dataScreen';

// 使用 as 类型解决undefined
const { color, setColor } = inject(BgColorKey) as BgColor;
console.log(color, setColor, '💚 provide inject');
</script>

<template>
  <div>数据大屏</div>
</template>

<style scoped lang="scss"></style>
