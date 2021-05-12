<template>
  <AppProvider>
    <RouterView />
  </AppProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { AppProvider } from '/@/components/Applications';
  import { initAppConfigStore } from '/@/config/initAppConfig';
  import { userStore } from '/@/store/modules/user'
  export default defineComponent({
    name: 'App',
    components: { AppProvider },
    setup() {
      initAppConfigStore();
      async function runPermission(){
        const userInfo = await userStore.getAppPermission();
        if (!userInfo) {
          //TODO 直接登出
        }
      }
      runPermission();
    },
  });
</script>
