<template>
  <div :class="[prefixCls]">
    <el-image style="width: 32px; height: 32px;" :src="url" :fit="fit" />
    <div>{{ title }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'AppLogo',
    setup() {
      const { prefixCls } = useDesign('app-logo');
      return {
        prefixCls,
      };
    },
    data() {
      return {
        title: 'ABC',
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        fit: 'contain',
      };
    },
  });
</script>
<style lang="scss" scoped>
  .#{$namespace}-app-logo {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
</style>
