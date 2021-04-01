<template>
  <div :class="[prefixCls]">
    <el-image style="width: 32px; height: 32px" src="/src/assets/images/logo/logo.png" fit="contain" />
    <div v-if="showLogoTitle" :class="[`${prefixCls}-titlt`]">{{ title }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useGlobSetting } from '/@/hooks/setting';
  export default defineComponent({
    name: 'AppLogo',
    props: {
      showLogoTitle: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
    },
    setup() {
      const { prefixCls } = useDesign('app-logo');
      const { title } = useGlobSetting();

      return {
        prefixCls,
        title,
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
    &-titlt {
      padding-left: 8px;
      font-size: 16px;
      font-weight: 700;
      color: $--color-white;
    }
  }
</style>
