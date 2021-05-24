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
    <div class="el-loading-spinner loading-spin">
      <!-- <svg class="circular" viewBox="25 25 50 50">
        <circle class="path" cx="50" cy="50" r="20" fill="none" />
      </svg> -->
      <span class="loading-spin-dot loading-spin-dot-spin">
        <i class="loading-spin-dot-item"></i>
        <i class="loading-spin-dot-item"></i>
        <i class="loading-spin-dot-item"></i>
        <i class="loading-spin-dot-item"></i>
      </span>
      <div class="loading-spin-text">智汇校园管理系统</div>
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
  @keyframes spinRotate {
    to {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }
  @-webkit-keyframes spinRotate {
    to {
      -webkit-transform: rotate(405deg);
      transform: rotate(405deg);
    }
  }
  @keyframes spinSpinMove {
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes spinSpinMove {
    to {
      opacity: 1;
    }
  }
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
    .loading-spin {
      &-dot {
        position: relative;
        display: inline-block;
        font-size: 32px;
        width: 48px;
        height: 48px;
        &-item {
          position: absolute;
          display: block;
          width: 20px;
          height: 20px;
          background-color: #0084f4;
          border-radius: 100%;
          transform: scale(.75);
          transform-origin: 50% 50%;
          opacity: .3;
          -webkit-animation: spinSpinMove 1s linear infinite alternate;
          animation: spinSpinMove 1s linear infinite alternate;
          &:first-child {
            top: 0;
            left: 0;
          }
          &:nth-child(2) {
            top: 0;
            right: 0;
            -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s;
          }
          &:nth-child(3) {
            right: 0;
            bottom: 0;
            -webkit-animation-delay: 0.8s;
            animation-delay: 0.8s;
          }
          &:nth-child(4) {
            bottom: 0;
            left: 0;
            -webkit-animation-delay: 1.2s;
            animation-delay: 1.2s;
          }
        }
      }
      &-dot-spin {
        transform: rotate(45deg);
        -webkit-animation: spinRotate 1.2s linear infinite;
        animation: spinRotate 1.2s linear infinite;
      }
      &-text{
        margin-top: 30px;
        font-size: 22px;
        text-shadow: 0 1px 2px #fff;
        color: rgba(0, 0, 0, 0.85);
        justify-content: center;
        align-items: center;
      }
    }
  }
</style>
