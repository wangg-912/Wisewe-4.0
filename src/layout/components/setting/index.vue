<template>
  <div :class="[`${prefixCls}`, `${prefixCls}--${getPosition}`]">
    <i class="el-icon-setting" @click="openDrawer(true, 'rtl', ture)"></i>
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, unref, computed } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import { useDrawer } from '/@/components/Drawer';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'DrawerWraper',
    components: { SettingDrawer },
    setup() {
      const [register, { openDrawer }] = useDrawer();
      const { getSettingPosition } = useRootSetting();
      const { prefixCls } = useDesign('setting-buttom');
      const getPosition = computed(() => unref(getSettingPosition));
      return {
        register,
        openDrawer,
        prefixCls,
        getPosition,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .#{$namespace}-setting-buttom {
    &--fixed {
      i {
        font-size: 20px;
        color: #fff;
      }
    }
  }
</style>
