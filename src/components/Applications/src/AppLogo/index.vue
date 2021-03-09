<template>
  <div :class="[prefixCls]">
    <el-image style="width: 32px; height: 32px" :src="url" :fit="fit" />
    <div v-if="showTitle" :class="[`${prefixCls}-titlt`]">{{ title }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, onMounted, watchEffect } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  export default defineComponent({
    name: 'AppLogo',
    props: {
      showTitle: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const { prefixCls } = useDesign('app-logo');
      return {
        prefixCls,
      };
    },
    data() {
      return {
        title: '智汇校园服务系统',
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
    height: $headers-height;
    &-titlt{
      padding-left: 8px;
      font-size: 16px;
      font-weight: 700;
      color: $--color-white;
    }
  }
</style>
 