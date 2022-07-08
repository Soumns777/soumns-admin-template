<script lang="ts" setup>
import type { Ref } from 'vue';
import { bgColorKey, IBgcolor } from '@/types/provideKey';
import Father from './father.vue';
import { IExpose } from '@/libs/types';

// defineProps+defineEmits
let bgColor = $ref('#ff6100');
const test = $ref('测试数据');
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

watch(
  () => test,
  () => {
    console.log(test, '💛💙 test');
  },
  { immediate: true }
);

// ref+defineExpose
const father = $ref<IExpose>();

const getRef = () => {
  nextTick(() => {
    console.log(father.test_expose, '💛💙 test_expose');
  });
};
getRef();

const show = $ref(true);
</script>

<template>
  <div class="box" w="100%" h="20px">数据大屏</div>

  <button
    class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-pink-500 border-none cursor-pointer"
    m="10px"
    @click="father.changeExpose('777')"
  >
    change-ref
  </button>
  <Father v-model:bgColor="bgColor" v-model:test="test" ref="father" />

  <Transition name="fade-transform">
    <p v-if="show" style="text-align: center">
      Hello here is some bouncy text!
    </p>
  </Transition>

  <button
    class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-purple-500 border-none cursor-pointer"
    m="10px"
    @click="show = !show"
  >
    change-show
  </button>
</template>

<style scoped lang="scss">
.box {
  background-color: v-bind(bgColor);
}
</style>
