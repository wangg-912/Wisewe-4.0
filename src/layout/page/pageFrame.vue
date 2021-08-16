<template>
  <div :class="prefixCls">
    <FramePanel v-if="getCanEmbedIFramePage" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import FramePanel from '/@/layout/iframe/index.vue';
  export default defineComponent({
    name: 'PageLayout',
    components: { FramePanel },
    setup() {
      const { prefixCls } = useDesign('layout-wrapper');
      const { getCanEmbedIFramePage } = useRootSetting();
      return {
        prefixCls,
        getCanEmbedIFramePage,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-wrapper {
    width: 99.9%;
    height: 100%;
  }
</style>
