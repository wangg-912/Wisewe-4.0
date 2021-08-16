<template>
  <div :class="prefixCls" v-if="showFrame">
    <template v-for="frame in getFramePages" :key="frame.path">
      <FrameView
        v-if="frame.meta.frameSrc && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frameSrc="resetFrameURL(frame.meta.frameSrc)"
      />
    </template>
  </div>
</template>
<script lang="ts">
  import { defineComponent, computed, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import FrameView from './iframeView.vue';
  import { useFrameKeepAlive } from './useFrameKeepAlive';
  export default defineComponent({
    name: 'FramePanel',
    components: { FrameView },
    setup() {
      const { prefixCls } = useDesign('frame-wrapper');
      const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();
      const showFrame = computed(() => unref(getFramePages).length > 0);
      function resetFrameURL(uri: string) {
        return uri.includes('?') ? `${uri}&t=${+new Date()}` : `${uri}?t=${+new Date()}`;
      }
      return {
        prefixCls,
        getFramePages,
        hasRenderFrame,
        showIframe,
        showFrame,
        resetFrameURL,
      };
    },
  });
</script>
