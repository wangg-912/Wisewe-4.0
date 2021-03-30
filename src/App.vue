<template>
  <AppProvider>
    <router-view />
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { AppProvider } from '/@/components/Applications';
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
  });
</script>
