<template>
  <div :class="prefixCls">
    <iframe :src="frameSrc" :class="`${prefixCls}--main`" ref="frameRef"></iframe>
    <page-nofind />
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, PropType, ref, unref } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
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
      const frameRef = ref<HTMLElement | null>(null);
      const { prefixCls } = useDesign('iframe-page');
      /* function frameLoad(){
        const $frame = unref(frameRef);
        $frame.onload = function(){
          const { contentWindow } = $frame;
          if(contentWindow.document.body && !contentWindow.document.body.innerHTML){
            $frame.src = '404.html';
          }
        }
      }
      
      setTimeout(()=>{
        frameLoad();
      },0); */
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
