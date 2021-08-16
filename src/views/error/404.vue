<template>
  <div class="page404-container">
    <div class="page-http404" :class="[`${prefixCls}`, getIsMobile ? `${prefixCls}-mobile` : ``]">
      <div class="pic-404">
        <img class="pic-404__parent" src="./../../assets/images/404/404.png" alt="404" />
        <img class="pic-404__child left" src="./../../assets/images/404/404_cloud.png" alt="404" />
        <img class="pic-404__child mid" src="./../../assets/images/404/404_cloud.png" alt="404" />
        <img class="pic-404__child right" src="./../../assets/images/404/404_cloud.png" alt="404" />
      </div>
      <div class="error">
        <div class="error__oops">抱歉!</div>
        <div class="error__headline">当前页面加载错误或不存在...</div>
        <div class="error__info"> 请检查您输入的网址是否正确，或稍后重试。 </div>
        <!-- <a href="/" class="error__return-home">回到首页</a> -->
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useAppInject } from '/@/hooks/web/useAppInject';
  export default defineComponent({
    name: 'Error',
    setup() {
      const { prefixCls } = useDesign('error');
      const { getIsMobile } = useAppInject();
      return {
        prefixCls,
        getIsMobile,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .page404-container {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .page-http404 {
    position: relative;
    width: 1200px;
    padding: 0 50px;
    overflow: hidden;

    .pic-404 {
      position: relative;
      float: left;
      width: 600px;
      overflow: hidden;

      &__parent {
        width: 100%;
      }

      &__child {
        position: absolute;

        &.left {
          top: 17px;
          left: 220px;
          width: 80px;
          opacity: 0;
          animation-delay: 1s;
          animation-duration: 2s;
          animation-name: cloudLeft;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        &.mid {
          top: 10px;
          left: 420px;
          width: 46px;
          opacity: 0;
          animation-delay: 1.2s;
          animation-duration: 2s;
          animation-name: cloudMid;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }

        &.right {
          top: 100px;
          left: 500px;
          width: 62px;
          opacity: 0;
          animation-delay: 1s;
          animation-duration: 2s;
          animation-name: cloudRight;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
        @keyframes cloudLeft {
          0% {
            top: 17px;
            left: 220px;
            opacity: 0;
          }

          20% {
            top: 33px;
            left: 188px;
            opacity: 1;
          }

          80% {
            top: 81px;
            left: 92px;
            opacity: 1;
          }

          100% {
            top: 97px;
            left: 60px;
            opacity: 0;
          }
        }
        @keyframes cloudMid {
          0% {
            top: 10px;
            left: 420px;
            opacity: 0;
          }

          20% {
            top: 40px;
            left: 360px;
            opacity: 1;
          }

          70% {
            top: 130px;
            left: 180px;
            opacity: 1;
          }

          100% {
            top: 160px;
            left: 120px;
            opacity: 0;
          }
        }
        @keyframes cloudRight {
          0% {
            top: 100px;
            left: 500px;
            opacity: 0;
          }

          20% {
            top: 120px;
            left: 460px;
            opacity: 1;
          }

          80% {
            top: 180px;
            left: 340px;
            opacity: 1;
          }

          100% {
            top: 200px;
            left: 300px;
            opacity: 0;
          }
        }
      }
    }

    .error {
      position: relative;
      float: left;
      width: 300px;
      padding: 30px 0;
      overflow: hidden;
      text-align: left;

      &__oops {
        margin-bottom: 20px;
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &__headline {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
        line-height: 24px;
        color: #222;
        opacity: 0;
        animation-delay: 0.1s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &__info {
        margin-bottom: 30px;
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        animation-delay: 0.2s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }

      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        font-size: 14px;
        line-height: 36px;
        color: #fff;
        text-align: center;
        cursor: pointer;
        background: #1482f0;
        border-radius: 100px;
        opacity: 0;
        animation-delay: 0.3s;
        animation-duration: 0.5s;
        animation-name: slideUp;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          opacity: 0;
          transform: translateY(60px);
        }

        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
  .#{$namespace}-error {
    &-mobile {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0;

      .pic-404 {
        width: 100%;
      }
    }
  }
</style>
