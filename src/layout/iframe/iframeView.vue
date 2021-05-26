<template>
  <div :class="prefixCls">
    <iframe :src="frameSrc" :class="`${prefixCls}--main`" ref="frameRef"></iframe>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, PropType, ref, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'FrameView',
    props: {
      frameSrc: {
        type: String as PropType<string>,
        default: '',
      },
    },
    setup() {
      const frameRef = ref<HTMLElement | null>(null);
      const { prefixCls } = useDesign('iframe-page');
      onMounted(()=>{
        frameLoad();
      })
      function frameLoad(){
        const $frame = unref(frameRef);
        $frame.onload = function(){
          const { contentWindow } = $frame;
          if(contentWindow.document.body && !contentWindow.document.body.innerHTML){
            $frame.src = '/404.html';
          }
          
        }
      }
      return {
        prefixCls,
        frameRef,
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
