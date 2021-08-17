<template>
  <div class="bashbord-wrap">
    <panel-group />
    <el-row :gutter="20" style="margin-bottom: 16px; flex: 0.4">
      <el-col :span="10">
        <div class="chart__wrap chart__wrap-left">
          <echart :options="pieEchatOptions" :height="'300px'" style="width: inherit" />
        </div>
      </el-col>
      <el-col :span="14">
        <div class="chart__wrap chart__wrap-right">
          <echart :options="barEchatOptions" :height="'300px'" style="width: inherit" />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom: 10px; flex: 0.5">
      <el-col :span="24">
        <div class="chart__wrap">
          <echart :options="lineEchatOptions" :height="'350px'" style="width: inherit" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import Echart from '/@/components/Echart/index.vue';
  import PanelGroup from './components/PanelGroup.vue';
  import { lineOptions, pieOptions, barOptions } from './echart-data';
  import type { EChartOption } from 'echarts';
  export default defineComponent({
    name: 'Dashboard',
    components: {
      Echart,
      PanelGroup,
    },
    setup() {
      const lineEchatOptions = reactive<EChartOption>(lineOptions);
      const pieEchatOptions = reactive<EChartOption>(pieOptions);
      const barEchatOptions = reactive<EChartOption>(barOptions);
      return {
        lineEchatOptions,
        pieEchatOptions,
        barEchatOptions,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .bashbord-wrap {
    display: flex;
    height: inherit;
    background: #f1f1f1;
    flex-direction: column;
    flex: 1;

    .chart__wrap {
      display: flex;
      width: 98%;
      height: inherit;
      margin: 0 16px;
      background: #fff;
    }

    .chart__wrap-left {
      margin-right: 0;
    }

    .chart__wrap-right {
      margin-left: 0;
    }
  }
</style>
