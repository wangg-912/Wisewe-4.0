<template>
  <em v-if="type" :class="`${prefixCls}`">
    <i
      :class="[`${prefixCls}-icon`, type]"
      :style="{ fontSize: `${size}px`, padding: closely ? '0' : '0 4px' }"
    ></i>
  </em>
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
      closely: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },
    setup(props) {
      // eslint-disable-next-line vue/no-setup-props-destructure
      const { type, color, size } = props;
      const { prefixCls } = useDesign('font-type');
      return {
        prefixCls,
        // eslint-disable-next-line vue/no-dupe-keys
        type,
        // eslint-disable-next-line vue/no-dupe-keys
        color,
        // eslint-disable-next-line vue/no-dupe-keys
        size,
      };
    },
  });
</script>
<style lang="scss" scoped>
  @import 'https://at.alicdn.com/t/font_603057_wuzvuimjqrd.css';
  .#{$namespace}-font-type {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    &-icon {
      color: inherit !important;
    }
  }
</style>
