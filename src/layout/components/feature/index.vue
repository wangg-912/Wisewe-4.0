<template>
  <div>
    <DrawerWraper :class="prefixCls" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, reactive, toRefs } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  /* import LayoutTypePicker from '../header/components/LayoutTypePicker.vue'; */
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      DrawerWraper: createAsyncComponent(() => import('/@/layout/components/setting/index.vue')),
    },
    setup() {
      const { prefixCls } = useDesign('setting-drawer-fearure');
      const state = reactive({ drawer: true });
      return {
        ...toRefs(state),
        prefixCls,
      };
    },
  });
</script>
