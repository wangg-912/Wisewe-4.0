<template>
  <section
    class="full-loading"
    :class="{ absolute }"
    v-if="loading"
    :style="getStyle"
    :lock="lock"
    :text="text"
    :customClass="customClass"
    :spinner="spinner"
  >
    <div class="el-loading-spinner">
      <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
  </section>
</template>
<script lang="ts">
  import { defineComponent, computed, CSSProperties, PropType } from 'vue';
  import { ThemeEnum } from '/@/enums/appEnum';
  export default defineComponent({
    name: 'Loading',
    props: {
      text: {
        type: String as PropType<string>,
        default: '加载中...',
      },
      absolute: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      customClass: {
        type: String as PropType<string>,
        default: '',
      },
      spinner: {
        type: String as PropType<string>,
        default: 'el-icon-loading',
      },
      loading: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      lock: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
      background: {
        type: String as PropType<string>,
      },
      theme: {
        type: String as PropType<'dark' | 'light'>,
        default: 'light',
      },
    },
    setup(props) {
      const getStyle = computed(
        (): CSSProperties => {
          const { background, theme } = props;
          const bgColor = background
            ? background
            : theme === ThemeEnum.DARK
            ? 'rgba(0, 0, 0, 0.2)'
            : 'rgba(240, 242, 245, 0.4)';
          return { background: bgColor };
        }
      );
      return { getStyle };
    },
  });
</script>
<style lang="scss" scoped>
  .full-loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    &.absolute {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 300;
    }
  }
</style>
