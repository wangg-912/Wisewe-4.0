<template>
  <div :class="prefixCls" :style="getWrapStyle">
    <iframe
      v-show="visibility"
      :src="frameSrc"
      :class="`${prefixCls}--main`"
      ref="frameRef"
    ></iframe>
    <page-nofind v-show="!visibility" />
  </div>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { defineComponent, computed, onMounted, PropType, ref, unref, nextTick } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
  import { useTagSetting } from '/@/hooks/setting/useTagSetting';
  import pageNofind from '/@/views/error/404.vue'
  export default defineComponent({
    name: 'FrameView',
    props: {
      frameSrc: {
        type: String as PropType<string>,
        default: '',
      },
    },
    components:{
      pageNofind,
    },
    setup() {
      const heightRef = ref(window.innerHeight);
      const frameRef = ref<HTMLElement | null>(null);
      const visibility = ref(true);
      const { prefixCls } = useDesign('iframe-page');
      const { getShowHeader } = useHeaderSetting();
      const { getTagsShow } = useTagSetting();
      const headerHeight = computed(() => (unref(getShowHeader) ? 56 : 0));
      const tagsHeight = computed(() => (unref(getTagsShow) ? 37 : 0));
      const getWrapStyle = computed(
        (): CSSProperties => {
          return {
            height: `${unref(heightRef) - headerHeight.value - tagsHeight.value - 8}px`,
          };
        }
      );
      function init() {
        nextTick(() => {
          const iframe = unref(frameRef);
          if (!iframe) return;

          const _frame = iframe as any;
          if (_frame.attachEvent) {
            _frame.attachEvent('onload', () => {
              //TODO
            });
          } else {
            iframe.onload = () => {
              const { contentWindow } = _frame;
              if(contentWindow.document.body && !contentWindow.document.body.innerHTML){
                visibility.value = false;
              }
            };
          }
        });
      }
      onMounted(() => {
        init();
      });
      return {
        prefixCls,
        getWrapStyle,
        frameRef,
        visibility,
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-iframe-page {
    height: inherit;
    &--main {
      border: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      & > body {
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
