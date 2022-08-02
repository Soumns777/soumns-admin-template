<script lang="ts" setup name="dataScreen">
import RealNumbers from './components/realNumbers.vue';

interface IRealNumbersExpose {
  initRealNumbers: (data: number) => void;
}
const realNumbers = $ref<IRealNumbersExpose>();

nextTick(() => {
  console.log(realNumbers, '💛💙 realNumbers');
});

onMounted(() => {
  realNumbers.initRealNumbers(0.5);
});
</script>

<template>
  <div>
    <RealNumbers ref="realNumbers" />
  </div>
</template>
