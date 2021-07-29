<template>
  <span :class="[prefixCls, { 'show-span': span && $slots.default }]">
    <slot></slot>
  </span>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'BasicTitle',
    props: {
      span: propTypes.bool,
    },
    setup() {
      const { prefixCls } = useDesign('basic-title');
      return { prefixCls };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-basic-title {
    position: relative;
    display: flex;
    padding-left: 0;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    color: $base-color-font;
    cursor: pointer;
    user-select: none;
    &.show-span::before {
      position: absolute;
      top: 4px;
      left: 0;
      width: 3px;
      height: 16px;
      margin-right: 4px;
      background: $base-color-primary;
      content: '';
    }
  }
</style>
