<template>
  <div>
    <DrawerWraper v-if="getIsFixedSettingDrawer" :class="prefixCls" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref, reactive, toRefs } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { SettingButtonPositionEnum } from '/@/enums/appEnum';
  import { createAsyncComponent } from '/@/utils/factory/asyncComponents';
  /* import LayoutTypePicker from '../header/components/LayoutTypePicker.vue'; */
  export default defineComponent({
    name: 'LayoutFeatures',
    components: {
      DrawerWraper: createAsyncComponent(() => import('/@/layout/components/setting/index.vue')),
    },
    setup() {
      const { getShowSetting, getSettingPosition, getFullContent } = useRootSetting();
      const { getShowHeader } = useHeaderSetting();
      const { prefixCls } = useDesign('setting-drawer-fearure');
      const getIsFixedSettingDrawer = computed(() => {
        if (!unref(getShowSetting)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return !unref(getShowHeader) || unref(getFullContent);
        }
        return settingButtonPosition === SettingButtonPositionEnum.FIXED;
      });

      return {
        prefixCls,
        getIsFixedSettingDrawer,
      };
    },
  });
</script>
