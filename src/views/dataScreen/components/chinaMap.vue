<script lang="ts" setup name="chinaMap">
import { ECharts, EChartsOption, init } from 'echarts';
import echarts from '@/hooks/useEcharts';
import mapJson from '../assets/china.json';

// 小飞机的图标
let planePath: string =
  'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
const initChinaMap = (data: any = []): ECharts => {
  const charEle = document.getElementById('mapChart') as HTMLElement;
  const charEch: ECharts = init(charEle);
  // 注册可用的地图
  echarts.registerMap('china', mapJson as any);
  const option: EChartsOption = {
    // 悬浮窗
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return `${params.name}: ${params.value || '-'}`;
      },
    },
    // echarts大小位置
    grid: {
      left: '0px',
      right: '80px',
      top: '10px',
      bottom: '10px',
    },
    // 地理坐标系组件
    geo: {
      map: 'china', // 使用 registerMap 注册的地图名称
      zoom: 1.5, // 当前视角的缩放比例
      center: [118.767413, 32.041544], // 地图中心经纬度 [102.848234, 32.82333]

      // 滚轮缩放的极限控制，通过min, max最小和最大的缩放值
      scaleLimit: {
        min: 0.8,
      },

      // 图形上的文本标签，可用于说明图形的一些数据信息
      label: {
        color: '#fff', // 文字的颜色
        show: true, // 是否显示标签
      },

      // 高亮状态下的多边形和标签样式
      emphasis: {
        label: {
          color: '#fff', // 文字的颜色
          show: true, // 是否显示标签
        },
        itemStyle: {
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          areaColor: {
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: '#073684', // 0% 处的颜色
              },
              {
                offset: 1,
                color: '#2B91B7', // 100% 处的颜色
              },
            ],
          },
        },
      },
      roam: false, // 是否开启拖拽缩放,可以只设置'scale'或者'move'
      itemStyle: {
        // 地图区域的颜色
        // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
        areaColor: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#073684', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#061E3D', // 100% 处的颜色
            },
          ],
        },

        // 图形的描边颜色
        borderColor: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: '#00F6FF',
            },
            {
              offset: 1,
              color: '#87ADCB',
            },
          ],
          false
        ),
        shadowColor: 'rgba(10,76,139,1)', // 阴影颜色
        shadowOffsetY: 0, // 阴影垂直方向上的偏移距离
        shadowBlur: 60, // 图形阴影的模糊大小，配合shadowOffsetX、shadowOffsetY一起设置图形的阴影效果
        borderWidth: 1, // 描边线宽
      },
      // 提示框组件
      tooltip: {
        show: false, // 是否显示提示框组件
      },
    },
    // 要显示的散点数据
    series: [
      {
        name: '',
        type: 'lines',
        coordinateSystem: 'geo', // 该系列使用的坐标系
        zlevel: 1,
        effect: {
          show: true,
          period: 6,
          trailLength: 0.7,
          color: '#D7000F', //arrow箭头的颜色
          symbolSize: 3,
        },
        lineStyle: {
          color: '#fff',
          width: 0,
          curveness: 0.2,
        },
        data, // 线数据集
      },
      {
        name: '', // 系列名称，用于tooltip的显示
        type: 'lines',
        coordinateSystem: 'geo', // 该系列使用的坐标系
        zlevel: 2, // 路径图所有图形的 zlevel 值
        // zlevel用于 Canvas 分层，不同zlevel值的图形会放置在不同的 Canvas 中，Canvas 分层是一种常见的优化手段。我们可以把一些图形变化频繁（例如有动画）的组件设置成一个单独的zlevel。需要注意的是过多的 Canvas 会引起内存开销的增大，在手机端上需要谨慎使用以防崩溃。 zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。
        symbol: ['none', 'arrow'], // 线两端的标记类型，可以是一个数组分别指定两端，也可以是单个统一指定
        symbolSize: 10, // 线两端的标记大小，可以是一个数组分别指定两端，也可以是单个统一指定

        // 线特效的配置
        effect: {
          show: true, // 是否显示特效
          period: 6, // 特效动画的时间
          trailLength: 0, // 特效尾迹的长度
          symbol: planePath, // 特效图形的标记,小飞机
          symbolSize: 15, // 特效标记的大小
        },
        lineStyle: {
          color: '#fff', // 线的颜色
          width: 1, // 线宽
          opacity: 0.6, // 图形透明度
          curveness: 0.2, // 边的曲度
        },
        data, // 线数据集
      },
    ],
  };
  charEch.setOption(option);
  return charEch;
};
defineExpose({
  initChinaMap,
});
</script>

<template>
  <div class="map-ball"></div>
  <div class="echarts" id="mapChart" w="706px" h="500px"></div>
</template>

<style lang="scss" scoped>
// .echarts {
//   width: 100%;
//   height: 100%;
// }
.map-ball {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 706px;
  height: 496px;

  img {
    width: 706px;
    height: 496px;
  }
}
</style>
