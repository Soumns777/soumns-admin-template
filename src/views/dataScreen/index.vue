<script lang="ts" setup name="dataScreen">
import RealNumbers from './components/realNumbers.vue';

interface IRealNumbersExpose {
  initRealNumbers: (data: number) => void;
}
const realNumbers = $ref<IRealNumbersExpose>();

onMounted(() => {
  realNumbers.initRealNumbers(0.5);
});
</script>

<template>
  <div class="w-full h-screen dataScreen-container">
    <div class="realNumbers" w="287px" h="221px" p="x20px y10px">
      <div absolute top-1px left-0px flex flex-col>
        <span text-12px m="b6px" color="white">实时游客统计</span>
        <img
          src="@/assets/uploads/dataScreen-title.png"
          w="68px"
          h="7px"
          alt=""
        />
      </div>
      <span color="white">111</span>
      <RealNumbers ref="realNumbers" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dataScreen-container {
  background: url('@/assets/uploads/bg.png') no-repeat;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: 100% 100%;
  background-size: cover;

  .realNumbers {
    background: url('@/assets/uploads/dataScreen-main-lc.png') no-repeat;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
