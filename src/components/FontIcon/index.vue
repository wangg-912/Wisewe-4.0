<template>
  <span v-if="type" :calss="`${prefixCls}`">
    <i :class="[`${prefixCls}-icon`, type]" :style="{fontSize:`${size}px`,color:`${color}`}"></i>
  </span>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'FontIcon',
    props: {
      type: {
        type: String as PropType<string>,
        default: '',
      },
      color: {
        type: String as PropType<string>,
        default: '#333',
      },
      size: {
        type: String as PropType<string>,
        default: '16',
      },
    },
    setup(props) {
      const { type, color, size } = props;
      const { prefixCls } = useDesign('font-type');
      return {
        prefixCls,
        type,
        color,
        size,
      }
    },
  });
</script>
<style lang="scss" scoped>
  @import './../../style/icons.scss';
  .#{$namespace}-font-type {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    &-icon{
      padding:4px;
    }
  }
</style>
