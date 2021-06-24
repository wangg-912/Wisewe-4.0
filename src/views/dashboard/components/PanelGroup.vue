<template>
  <el-row :gutter="0" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <i class="card-panel-icon el-icon-user-solid"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text"> 新增用户 </div>
          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon el-icon-message-solid"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text"> 未读信息 </div>
          <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-message">
          <i class="card-panel-icon el-icon-s-marketing"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text"> 访问量 </div>
          <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <i class="card-panel-icon el-icon-s-management"></i>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text"> 日常访问 </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
  import CountTo from '/@/components/CountTo/index.vue';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'PanelGroup',
    components: {
      CountTo,
    },
    emits: ['handleSetLineChartData'],
    setup(props, { emit }) {
      function handleSetLineChartData(type: string): void {
        emit('handleSetLineChartData', type);
      }
      return {
        handleSetLineChartData,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .panel-group {
    margin: 10px 0 !important;
    flex:0.1;
    .card-panel-col {
      padding: 10px;
      &:first-child{
        padding-left: 16px;
      }
      &:last-child{
        padding-right: 16px;
      }
    }
    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }
        .icon-people {
          background: #40c9c6;
        }
        .icon-message {
          background: #36a3f7;
        }
        .icon-money {
          background: #f4516c;
        }
        .icon-shopping {
          background: #34bfa3;
        }
      }
      .icon-people {
        color: #40c9c6;
      }
      .icon-message {
        color: #36a3f7;
      }
      .icon-money {
        color: #f4516c;
      }
      .icon-shopping {
        color: #34bfa3;
      }
      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }
      .card-panel-icon {
        float: left;
        font-size: 48px;
      }
      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;
        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }
        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }
</style>
