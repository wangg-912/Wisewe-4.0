<template>
  <div :class="`${prefixCls}`">
    <span :class="`${prefixCls}__item`">
      <FontIcon type="iconfont icon-enter" />
    </span>
    <span>确认</span>

    <span :class="`${prefixCls}__item`">
      <FontIcon type="iconfont icon-shangjiantou" />
    </span>
    <span :class="`${prefixCls}__item`">
      <FontIcon type="iconfont icon-down" />
    </span>
    <span>切换</span>
    <span :class="`${prefixCls}__item`">
      <FontIcon type="iconfont icon-ESC" />
    </span>
    <span>关闭</span>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import FontIcon from '/@/components/FontIcon/index.vue';
  export default defineComponent({
    name: 'AppSearchFooter',
    components:{FontIcon},
    setup(){
      const { prefixCls } = useDesign('app-search-footer');
      return{
        prefixCls,
      }
    }
  })
</script>
<style lang="scss" scoped>
  .#{$namespace}-app-search-footer{
    position: relative;
    display: flex;
    height: 44px;
    padding: 0 16px;
    font-size: 12px;
    color: #666;
    background: rgb(255 255 255);
    border-radius: 0 0 16px 16px;
    box-shadow: 0 -1px 0 0 #e0e3e8, 0 -3px 6px 0 rgba(69, 98, 155, 0.12);
    align-items: center;
    flex-shrink: 0;

    &__item {
      display: flex;
      width: 20px;
      height: 18px;
      padding-bottom: 2px;
      margin-right: 0.4em;
      background: linear-gradient(-225deg, #d5dbe4, #f8f8f8);
      border-radius: 2px;
      box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
        0 1px 2px 1px rgba(30, 35, 90, 0.4);
      align-items: center;
      justify-content: center;

      &:nth-child(2),
      &:nth-child(3),
      &:nth-child(6) {
        margin-left: 14px;
      }
    }
  }
</style>