<!--
 * @Description: The reason is that tsx will report warnings under multi-level nesting.
-->
<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <!-- <transition
          :name="
            getTransitionName({
              route,
              openCache: openCache,
              enableTransition: getEnableTransition,
              cacheTabs: getCaches,
              def: getBasicTransition,
            })
          "
          mode="out-in"
          appear
        > -->
      <transition name="fade" mode="out-in" appear>
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" v-bind="getKey(Component, route)" />
        </keep-alive>
        <component v-else :is="Component" v-bind="getKey(Component, route)" />
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import { useTransitionSetting } from '/@/hooks/setting/useTransitionSetting';
  import { useCache, getKey } from './useCache';
  import { getTransitionName } from './transition';

  export default defineComponent({
    parentView: true,
    setup() {
      const { getCaches } = useCache(false);
      const { getOpenKeepAlive } = useRootSetting();
      const { getTagsShow } = useTagSetting();
      const { getBasicTransition, getEnableTransition } = useTransitionSetting();

      const openCache = computed(() => unref(getOpenKeepAlive) && unref(getTagsShow));

      return {
        getCaches,
        getBasicTransition,
        openCache,
        getEnableTransition,
        getTransitionName,
        getKey,
      };
    },
  });
</script>
