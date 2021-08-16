<template>
  <ElConfigProvider :locale="locale">
    <AppProvider>
      <RouterView />
    </AppProvider>
  </ElConfigProvider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import locale from 'element-plus/lib/locale/lang/zh-cn';
  import { ElConfigProvider } from 'element-plus';
  import { AppProvider } from '/@/components/Applications';
  import { initAppConfigStore } from '/@/config/initAppConfig';
  import { userStore } from '/@/store/modules/user';
  export default defineComponent({
    name: 'App',
    components: { ElConfigProvider, AppProvider },
    setup() {
      initAppConfigStore();
      async function runPermission() {
        const userInfo = await userStore.getAppPermission();
        if (!userInfo) {
          //TODO
        }
      }
      runPermission();
      return {
        locale,
      };
    },
  });
</script>
