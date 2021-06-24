<template>
  <div v-if="showFrame" style="height: auto">
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
  import { defineComponent, computed, unref, reactive, toRefs, watchEffect } from 'vue';
  import { useRouter } from 'vue-router'
  import FrameView from './iframeView.vue';
  import { useFrameKeepAlive } from './useFrameKeepAlive';
  export default defineComponent({
    name: 'FramePanel',
    components: { FrameView },
    setup() {
      const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();
      //debugger;
      const showFrame = computed(() => unref(getFramePages).length > 0);
      const { currentRoute } = useRouter();
      /* const state = reactive({
        styles: {
          display: 'none',
        }
      }) */
      /* watchEffect(() => {
        const { meta } = currentRoute.value;
        state.styles = Object.assign(
          {},
          {
            display: meta?.frameSrc ? 'block' : 'none',
          }
        );
      }) */
      return {
        getFramePages,
        hasRenderFrame,
        showIframe,
        showFrame,/* 
        ...toRefs(state), */
      };
    },
  });
</script>
<style lang="scss" scoped></style>
