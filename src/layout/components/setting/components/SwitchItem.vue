<template>
  <div :class="`${prefixCls}`">
    <span :class="`${prefixCls}-label`"> {{ title }}</span>
    <el-switch v-model="getValue" :disabled="disabled" @change="handleChange" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { baseHandler } from '../handler';
  import { HandlerEnum } from '../enums';
  export default defineComponent({
    name: 'SwitchItem',
    props: {
      event: {
        type: Number as PropType<HandlerEnum>,
        default: () => {},
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
      },
      def: {
        type: Boolean,
      },
    },
    setup(props) {
      const { prefixCls } = useDesign('setting-switch');

      const getValue = computed(() => {
        return props.def || false;
      });

      function handleChange(e: ChangeEvent) {
        debugger;
        props.event && baseHandler(props.event, e);
      }
      return {
        prefixCls,
        getValue,
        handleChange,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-setting-switch {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
    padding: 0 12px;
    &-label{
      font-size: $--font-size-base;
      color:$--color-drak;
    }
  }
</style>
