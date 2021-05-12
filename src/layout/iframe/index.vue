<template>
  <div v-if="showFrame" style="height:inherit">
    <template v-for="frame in getFramePages" :key="frame.path">
      <FrameView
        v-if="frame.meta.frameSrc && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frameSrc="frame.meta.frameSrc"
      />
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import FrameView from './iframeView.vue';
  import { useFrameKeepAlive } from './useFrameKeepAlive';
  export default defineComponent({
    name: 'FramePanel',
    components: { FrameView },
    setup() {
      const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();
      const showFrame = computed(() => unref(getFramePages).length > 0);
      /* console.log(getFramePages) */
      return {
        getFramePages,
        hasRenderFrame,
        showIframe,
        showFrame,
      };
    },
  });
</script>
<style lang="scss" scoped></style>
