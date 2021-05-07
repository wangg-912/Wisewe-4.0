<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { AppProvider } from '/@/components/Applications';
  import { initAppConfigStore } from '/@/config/initAppConfig';
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
    setup() {
      initAppConfigStore();
    }
  });
</script>
