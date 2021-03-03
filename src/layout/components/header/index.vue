<template>
  <el-header :class="[prefixCls]">
    <AppLogo />
    <!-- <LayoutTypePicker /> -->
  </el-header>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { AppLogo } from '/@/components/Applications';
  import LayoutTypePicker from './components/LayoutTypePicker.vue';
  export default defineComponent({
    name: 'LayoutHeader',
    components: {
      AppLogo,
      /* LayoutTypePicker, */
    },
    setup() {
      const { prefixCls } = useDesign('layout-header');
      return {
        prefixCls,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-header {
    width: 100%;
  }
</style>
