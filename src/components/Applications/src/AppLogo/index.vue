<template>
  <div
    :class="[`${prefixCls}`, `${prefixCls}--${theme}`, `${prefixCls}--${siderType}`, `${isMobile}`]"
  >
    <img
      style="width: 32px; height: 32px; border-radius: 4px;"
      src="./../../../../assets/images/logo/logo.png"
      fit="contain"
    />
    <div v-if="showLogoTitle" class="titlt" :class="[`${prefixCls}--${theme}-titlt`]">{{
      title
    }}</div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useGlobSetting } from '/@/hooks/setting';
  import { propTypes } from '/@/utils/propTypes';
  export default defineComponent({
    name: 'AppLogo',
    props: {
      theme: propTypes.oneOf(['dark', 'light']),
      showLogoTitle: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
      siderType: {
        type: String as PropType<string>,
        default: 'sidebar',
      },
      isMobile: {
        type: String as PropType<string>,
        default: '',
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
    height: $headers-height;
    cursor: pointer;
    transition: all 0.2s ease;
    align-items: center;
    justify-content: center;

    .titlt {
      width: 160px;
      padding-left: 8px;
      font-size: 16px;
      font-weight: 700;
      color: $--color-white;
    }

    &--light {
      &-titlt {
        color: $--color-drak !important;
      }
    }

    &--dark {
      &-title {
        color: $--color-white !important;
      }
    }

    &--mix {
      width: 240px;
    }

    &--mix,
    &--top-menu {
      padding-left: 8px;
    }

    &.mobile {
      width: auto;
      height: 32px;
      padding-left: 8px;
      border: 0;
    }
  }
</style>
