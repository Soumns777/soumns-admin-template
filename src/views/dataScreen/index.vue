<script lang="ts" setup>
import type { Ref } from 'vue';
import { bgColorKey, IBgcolor } from '@/types/provideKey';
import Father from './father.vue';

let bgColor = $ref('#ff6100');

const setBgColor = (color: string): void => {
  bgColor = color;
};
provide(bgColorKey, {
  bgColor: $$(bgColor),
  setBgColor,
});

watch(
  () => bgColor,
  () => {
    console.log(bgColor, '💛💙 bgColor');
  },
  { immediate: true }
);
</script>

<template>
  <div class="box" w="100%" h="20px">数据大屏</div>
  <Father v-model="bgColor" />
</template>

<style scoped lang="scss">
.box {
  background-color: v-bind(bgColor);
}
</style>
