<template>
  <div :class="prefixCls">
    <RouterView>
      <template #default="{ Component, route }">
        <transition >
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" v-bind="getKey(Component, route)" />
          </keep-alive>
          <component v-else :is="Component" v-bind="getKey(Component, route)" />
        </transition>
      </template>
    </RouterView>
    <FramePanel v-if="getCanEmbedIFramePage" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign'
  import FramePanel from '/@/layout/iframe/index.vue';
  import { getKey } from './useCache';
  import { getTransitionName } from './transition';
  export default defineComponent({
    name: 'PageLayout',
    components: { FramePanel },
    setup() {
      const { prefixCls } = useDesign('layout-wrapper');
      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();
      return {
        prefixCls,
        getKey,
        getOpenKeepAlive,
        getCanEmbedIFramePage,
        getTransitionName,
      }
    }
  })
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-wrapper{
    width: 100%;
    height: 100%;
  }
</style>
