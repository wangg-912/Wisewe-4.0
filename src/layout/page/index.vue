<template>
  <div>
    <RouterView>
      <template #default="{ Component, route }">
        <transition>
          <keep-alive v-if="openCache" :include="getCaches">
            <component :is="Component" v-bind="getKey(Component, route)" />
          </keep-alive>
          <component v-else :is="Component" v-bind="getKey(Component, route)" />
        </transition>
      </template>
    </RouterView>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue'
  import { getKey } from './useCache';
  export default defineComponent({
    name: 'PageLayout',
    setup() {
      return {
        getKey,
      }
    }
  })
</script>
