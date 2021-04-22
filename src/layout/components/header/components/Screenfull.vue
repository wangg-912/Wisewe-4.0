<template>
  <span :class="`${prefixCls}`" @click="click">
    <i :class="isFullscreen ? 'el-icon-crop' : 'el-icon-full-screen'" size="18"></i>
  </span>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import screenfull from 'screenfull';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'Screenfull',
    setup() {
      const { prefixCls } = useDesign('screen-full');
      const isFullscreen = ref<boolean>(false);
      const sf = screenfull;

      function init(): void {
        if (sf.isEnabled) {
          sf.on('change', () => {
            isFullscreen.value = sf.isFullscreen;
          });
        }
      }
      function click(): void | Boolean {
        if (!sf.isEnabled) {
          // message.warning('you browser can not work')
          return false;
        }
        sf.toggle();
      }
      onMounted(() => {
        init();
      });

      return {
        prefixCls,
        isFullscreen,
        click,
      };
    },
  });
</script>
