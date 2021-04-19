<template>
  <div>
    <i class="el-icon-setting" size="18" @click="openDrawer(true,'rtl',ture)"></i>
    <SettingDrawer @register="register" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  import { useDrawer } from '/@/components/Drawer';
  export default defineComponent({
    name: 'DrawerWraper',
    components: { SettingDrawer },
    setup() {
      const [register, { openDrawer }] = useDrawer();
      return {
        register,
        openDrawer,
      };
    },
  })
</script>
