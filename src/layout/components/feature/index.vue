<template>
  <DrawerWraper 
    v-if="getIsFixedSettingDrawer" 
    :class="[`${prefixCls}`, `${prefixCls}--${settingPosition}`]" />
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
        debugger;
        if (!unref(getShowSetting)) {
          return false;
        }
        const settingButtonPosition = unref(getSettingPosition);

        if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
          return !unref(getShowHeader) || unref(getFullContent);
        }
        return settingButtonPosition === SettingButtonPositionEnum.FIXED;
      });
      const settingPosition = computed(() => unref(getSettingPosition));

      return {
        prefixCls,
        settingPosition,
        getIsFixedSettingDrawer,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-setting-drawer-fearure {
    &--fixed {
      position: absolute;
      top: 70px;
      right: 0;
      width: 34px;
      height: 34px;
      background: #0960bd;
      display: flex;
      align-items: center;
      justify-content: center;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
  }
</style>
