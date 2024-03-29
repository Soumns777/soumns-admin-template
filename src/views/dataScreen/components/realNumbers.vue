<script lang="ts" setup name="realNumbers">
import { ECharts, init } from 'echarts';
import 'echarts-liquidfill';

// set real numbers
const numbers = $ref<number>(216908);
const autoNumbers = computed<string[]>(() => {
  return (numbers.toString() + '人').split('');
});

// init echarts
const initRealNumbers = (data: number = 1): ECharts => {
  const charEle = document.getElementById('RealTimeAccessChart') as HTMLElement;
  const charEch: ECharts = init(charEle);
  const option = {
    title: [
      {
        text: (data * 100).toFixed(0) + '%',
        left: '49%',
        top: '40%',
        textAlign: 'center',
        textStyle: {
          fontSize: '14',
          fontWeight: 'normal',
          color: '#ffffff',
          align: 'center',
          textBorderColor: 'rgba(0, 0, 0, 0)',
          textShadowColor: '#000',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1,
        },
      },
      {
        text: '预约量',
        left: '49%',
        top: '24%',
        textAlign: 'center',
        textStyle: {
          fontSize: '15',
          fontWeight: 'normal',
          color: '#ffffff',
          align: 'center',
          textBorderColor: 'rgba(0, 0, 0, 0)',
          textShadowColor: '#000',
          textShadowBlur: 0,
          textShadowOffsetX: 0,
          textShadowOffsetY: 1,
        },
      },
    ],
    grid: {
      top: '0',
      left: '0px',
      right: '0px',
      bottom: '0',
      containLabel: true,
    },
    polar: {
      radius: ['75%', '85%'],
      center: ['50%', '50%'],
    },
    angleAxis: {
      max: 120,
      clockwise: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      startAngle: 188,
    },
    radiusAxis: {
      type: 'category',
      show: true,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: 'liquidFill',
        radius: '70%',
        z: 2,
        center: ['50%', '50%'],
        data: [0.4, 0.4, 0.4], // data个数代表波浪数
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#35FAB6', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(40, 209, 247,0.3)', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
        outline: {
          borderDistance: 0,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#31d8d5',
            shadowBlur: 20,
            shadowColor: '#50c1a7',
          },
        },
        label: {
          show: false,
        },
        backgroundStyle: {
          borderWidth: 1,
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: {
            type: 'radial',
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              {
                offset: 0,
                color: '#0D2648', // 0% 处的颜色
              },
              {
                offset: 0.8,
                color: '#0D2648', // 100% 处的颜色
              },
              {
                offset: 1,
                color: '#228E7D', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
      {
        type: 'pie',
        radius: ['80%', '80%'],
        center: ['50%', '50%'],
        z: 1,
        label: {
          show: false,
        },
        silent: true,
        itemStyle: {
          borderWidth: 2,
          borderType: [8, 10],
          borderDashOffset: 15,
          borderColor: '#31d8d5',
          color: '#11144e',
          borderCap: 'round',
        },
        data: [100],
      },
      {
        type: 'bar',
        data: [55],
        z: 10,
        coordinateSystem: 'polar',
        roundCap: true,
        color: '#31d8d5',
      },
    ],
  };
  charEch.setOption(option);
  return charEch;
};

defineExpose({
  initRealNumbers,
});
</script>

<template>
  <!-- 实时人数统计 -->
  <div
    class="realNumbers"
    relative
    box-border
    w="287px"
    h="272px"
    p="x20px y50px"
  >
    <div absolute top-1px left-0px flex flex-col box-border>
      <span text-12px m="b6px" color="white" class="family">实时游客统计</span>
      <img
        src="@/assets/uploads/dataScreen-title.png"
        w="68px"
        h="7px"
        alt=""
      />
    </div>
    <!-- 实时人数统计 实际数量  -->
    <div color="white" box-border relative h="50px" flex items-center>
      <span
        v-for="(item, idx) in autoNumbers"
        :key="idx"
        w="38px"
        h="36px"
        color="#66ffff"
        bg-blue-500
        text-26px
        m="r1px"
        flex
        items-center
        justify-center
        class="real-bg"
      >
        {{ item }}</span
      >
    </div>

    <!-- 实时人数统计 echarts  -->
    <div
      class="echarts"
      m="t--16px l--40px "
      id="RealTimeAccessChart"
      w="287px"
      h="197px"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.realNumbers {
  background: url('@/assets/uploads/dataScreen-main-lc.png') no-repeat;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  .family {
    font-family: '优设标题黑';
  }

  .real-bg {
    background: url('@/assets/uploads/total.png') no-repeat;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-family: 'MetroDF';
  }
}
</style>
