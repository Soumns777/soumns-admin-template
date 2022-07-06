<script lang="ts" setup>
import Son from './son.vue';

// defineProps+defineEmits
const { bgColor, test } = defineProps(['bgColor', 'test']);
// console.log(bgColor, test, '💛💙 props ');

const emits = defineEmits<{
  (e: 'update:bgColor', bgColor: string): void;
  (e: 'update:test', test: string): void;
}>();

const setBgColor = () => {
  emits('update:bgColor', 'red');
};

const setTest = () => {
  emits('update:test', '测试数据-father');
};

// ref+defineExpose
let test_expose = $ref('test-expose');

const changeExpose = (str: string) => {
  test_expose = str;
};

watch(
  () => test_expose,
  () => {
    console.log(test_expose, '💛💙 father的test_expose');
  },
  { immediate: true }
);

defineExpose({ test_expose, changeExpose });
</script>

<template>
  <div class="container">
    father
    <button
      class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 border-none cursor-pointer"
      m="10px"
      @click="setBgColor()"
    >
      father-change
    </button>

    <button
      class="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-orange-500 border-none cursor-pointer"
      m="10px"
      @click="setTest()"
    >
      father-test
    </button>

    <Son></Son>
  </div>
</template>

<style scoped lang="scss"></style>
