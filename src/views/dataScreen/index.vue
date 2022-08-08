<script lang="ts" setup name="dataScreen">
import RealNumbers from './components/realNumbers.vue';
import ChinaMap from './components/chinaMap.vue';
import MapUnder from './components/mapUnder.vue';
// init real numbers
interface IRealNumbersExpose {
  initRealNumbers: (data: number) => void;
}
const realNumbers = $ref<IRealNumbersExpose>();

// init china map
let mapData = [
  {
    fromName: '北京',
    toName: '上海',
    coords: [
      [116.4551, 40.2539],
      [121.4648, 31.2891],
    ],
  },
  {
    fromName: '上海',
    toName: '北京',
    coords: [
      [121.4648, 31.2891],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '北京',
    toName: '广州',
    coords: [
      [116.4551, 40.2539],
      [113.5107, 23.2196],
    ],
  },
  {
    fromName: '广州',
    toName: '北京',
    coords: [
      [113.5107, 23.2196],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '北京',
    toName: '成都',
    coords: [
      [116.4551, 40.2539],
      [103.9526, 30.7617],
    ],
  },
  {
    fromName: '成都',
    toName: '北京',
    coords: [
      [103.9526, 30.7617],
      [116.4551, 40.2539],
    ],
  },
  {
    fromName: '成都',
    toName: '新疆维吾尔自治区',
    coords: [
      [103.9526, 30.7617],
      [85.294711, 41.371801],
    ],
  },
  {
    fromName: ' 新疆维吾尔自治区',
    toName: '成都',
    coords: [
      [85.294711, 41.371801],
      [103.9526, 30.7617],
    ],
  },
];
interface IChinaMapExpose {
  initChinaMap: (data: any[]) => void;
}
const chinaMap = $ref<IChinaMapExpose>();

onMounted(() => {
  realNumbers.initRealNumbers(0.5);
  chinaMap.initChinaMap(mapData);
});
</script>

<template>
  <div class="w-full h-screen dataScreen-container" box-border flex flex-col>
    <!-- 头部 -->
    <div flex w="100%" h="38px" bg="#FFD4A9" soumns-dfl soumns-kly>
      测试Unocss预设
    </div>

    <!-- 主体内容 -->
    <div flex box-border p="20px l40px">
      <!-- 左侧 -->
      <div flex flex-col>
        <!-- 实时人数统计 echarts  -->
        <RealNumbers ref="realNumbers" />

        <div w="287px" h="221px" m="t20px" bg="#CDA59E">男女比例</div>
        <div w="287px" h="198px" m="t20px" bg="#002EA6">年龄比例</div>
      </div>

      <!-- 中间 -->
      <div flex flex-col m="l40px" box-border>
        <div w="706px" h="500px" m="t30px">
          <!-- 飞机航线图 -->
          <!-- <ChinaMap ref="chinaMap" /> -->

          <!-- 地图下钻 -->
          <MapUnder ref="mapUnder" />
        </div>
        <div w="706px" h="184px" m="t16px" bg="#FF770F">
          未来30天客流量趋势图
        </div>
      </div>

      <!-- 右侧 -->
      <div flex flex-col m="l40px">
        <div w="287px" h="272px" bg="#D7000F">热门景区排行</div>
        <div w="287px" h="221px" m="t20px" bg="#91B822">年度游客量对比</div>
        <div w="287px" h="198px" m="t20px" bg="#FFE76F">预约渠道数量统计</div>
      </div>
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
}
</style>
