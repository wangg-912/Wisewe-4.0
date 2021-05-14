<template>
  <el-tabs v-model="activeName" tab-position="left" @tab-click="changeTab">
    <el-tab-pane
      v-for="(item, $index) in tabRoutes"
      :key="$index"
      :name="item.path === '/' ? '/dashboard' : item.path"
    >
      <template #label>
        <div class="label-item">
          <svg-icon :icon-class="filterTab(item, 'icon')" />
          <div class="title-item">{{ filterTab(item, 'title') }}</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, onMounted, computed } from 'vue';
  import { routeStore } from '/@/store/modules/route';
  import type { RouteRecordRaw } from 'vue-router';
  import { useRouter } from 'vue-router';
  import { findIndex, isExternal } from '/@/utils/tools';
  export default defineComponent({
    name: 'MixTabs',
    setup() {
      const { currentRoute, push } = useRouter();
      const activeName = ref<string>('');
      const routers = computed((): RouteRecordRaw[] => routeStore.routes);
      const tabRoutes = computed((): RouteRecordRaw[] =>
        routers.value.filter((v) => !v.meta?.hidden)
      );
      function init() {
        const currentPath = currentRoute.value.fullPath.split('/');
        const index = findIndex(tabRoutes.value, (v: RouteRecordRaw) => {
          if (v.path === '/') {
            return `/${currentPath[1]}` === '/dashboard';
          } else {
            return v.path === `/${currentPath[1]}`;
          }
        });
        if (index > -1) {
          activeName.value = `/${currentPath[1]}`;
          setActive(index);
          permissionStore.SetAcitveTab(activeName.value);
        }
      }
      function filterTab(item: RouteRecordRaw | any, key: string): any {
        return item.meta && item.meta[key] ? item.meta[key] : item.children[0].meta[key];
      }

      function setActive(index: number): void {
        const currRoute: any = tabRoutes.value[index];
        routeStore.setMenuTabRouters(currRoute.children);
      }

      function changeTab(item: any) {
        const currRoute: any = tabRoutes.value[item.index];
        routeStore.setMenuTabRouters(currRoute.children);
        if (isExternal(currRoute.children[0].path)) {
          window.open(currRoute.children[0].path);
        } else {
          push(
            `${activeName.value === '/home' ? '' : activeName.value}/${currRoute.children[0].path}`
          );
          routeStore.setAcitveTab(activeName.value);
        }
      }

      onMounted(() => {
        init();
      });

      watch(
        () => currentRoute.value,
        () => {
          init();
        }
      );
      watch(
        () => activeName.value,
        (val) => {
          routeStore.setAcitveTab(val);
        }
      );
      return {
        activeName,
        tabRoutes,
        filterTab,
        setActive,
        changeTab,
      };
    },
  });
</script>
