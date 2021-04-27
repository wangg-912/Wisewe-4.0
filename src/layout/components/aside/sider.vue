<template>
  <el-drawer
    v-if="getIsMobile"
    v-model="getMobileTriggrState"
    direction="ltr"
    custom-class="mobile-menu-drawer"
    size="240px"
    :show-close="false"
    :before-close="handleClose"
  >
    <template #title></template>
    <div class="mobile-menu-content">
      <LayoutSider :siderType="siderType" />
    </div>
  </el-drawer>
  <LayoutSider v-if="!getIsMobile" :siderType="siderType" />
</template>
<script lang="ts">
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  import { defineComponent, PropType } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  export default defineComponent({
    name: 'Sider',
    components: {
      LayoutSider: createAsyncComponent(() => import('/@/layout/components/aside/index.vue')),
    },
    props: {
      siderType: {
        type: String as PropType<string>,
        default: 'sidebar',
      },
    },
    setup() {
      const { getMobileTriggrState, toggleMobileTriggerState } = useRootSetting();
      const { getIsMobile } = useAppInject();
      function handleClose(){
        toggleMobileTriggerState(!getMobileTriggrState.value);
      }
      return {
        getIsMobile,
        getMobileTriggrState,
        handleClose,
      };
    },
  });
</script>
<style lang="scss">
  .mobile-menu-drawer {
    height: 100%;
    .el-drawer__header {
      display: none !important;
      width: 0;
      height: 0;
      padding: 0;
    }
    .mobile-menu-content{
      height: inherit;
    }
  }
</style>
