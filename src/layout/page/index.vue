<template>
  <div :class="prefixCls">
    <router-view>
      <template #default="{ Component, route }">
        <transition
          :name="
            getTransitionName({
              route,
              openCache,
              enableTransition: getEnableTransition,
              cacheTabs: getCaches,
              def: getBasicTransition,
            })
          "
          mode="out-in"
          appear
        >
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" v-bind="getKey(Component, route)" />
          </keep-alive>
          <component v-else :is="Component" v-bind="getKey(Component, route)" />
        </transition>
      </template>
    </router-view>
    <FramePanel v-if="getCanEmbedIFramePage" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import FramePanel from '/@/layout/iframe/index.vue';
  import { useCache, getKey } from './useCache';
  import { getTransitionName } from './transition';
  export default defineComponent({
    name: 'PageLayout',
    components: { FramePanel },
    setup() {
      const { prefixCls } = useDesign('layout-wrapper');
      const { getOpenKeepAlive, getCanEmbedIFramePage } = useRootSetting();
      const { getTagsShow } = useTagSetting();
      const { getCaches } = useCache(false);
      const { getBasicTransition, getEnableTransition } = useTransitionSetting();
      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getTagsShow));
      return {
        prefixCls,
        getKey,
        getOpenKeepAlive,
        getCanEmbedIFramePage,
        getTransitionName,
        openCache,
        getEnableTransition,
        getBasicTransition,
        getCaches,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-layout-wrapper {
    width: 99.9%;
    height: 100%;
  }
</style>
