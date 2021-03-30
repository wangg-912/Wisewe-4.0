<template>
  <div>
    <SettingDrawer />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import SettingDrawer from './SettingDrawer';
  export default defineComponent({
    name: 'DrawerWraper',
    components: { SettingDrawer },
  })
</script>
