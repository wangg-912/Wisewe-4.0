<template>
  <el-scrollbar ref="wrapperRef" :class="prefixCls">
    <div ref="spinRef" :style="spinStyle" v-loading="loading" :element-loading-text="loadingTip">
      <slot></slot>
    </div>
  </el-scrollbar>
</template>
<script lang="ts">
  import type { CSSProperties } from 'vue';
  import { propTypes } from '/@/utils/propTypes';
  import {
    defineComponent,
    computed,
    ref,
    watchEffect,
    unref,
    watch,
    onMounted,
    nextTick,
    onUnmounted,
  } from 'vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { IDWrapperProps } from './../types';
  import { useWindow } from '/@/hooks/web/useWindow';
  import { createDialogContext } from '../hooks/useDialogContext';
  export default defineComponent({
    name: 'DialogWrapper',
    inheritAttrs: false,
    props: {
      loading: propTypes.bool,
      useWrapper: propTypes.bool.def(true),
      modalHeaderHeight: propTypes.number.def(45),
      modalFooterHeight: propTypes.number.def(55),
      width: propTypes.number.def(640),
      height: propTypes.number,
      footerOffset: propTypes.number.def(0),
      visible: propTypes.bool,
      fullscreen: propTypes.bool,
      renderFrame: propTypes.bool.def(false),
    },
    emits: ['height-change', 'ext-height'],
    setup(props: IDWrapperProps, { emit }) {
      const { prefixCls } = useDesign('dialog-wrapper');
      const wrapperRef = ref<ComponentRef>(null);
      const spinRef = ref<ElRef>(null);
      const realHeightRef = ref(0);
      const minRealHeightRef = ref(0);
      /* const frameRef = ref(null); */

      let realHeight = 0;
      let stopElResizeFn: Fn = () => {};

      useWindow(setModalHeight.bind(null, false));

      createDialogContext({
        redoModalHeight: setModalHeight,
      });

      const spinStyle = computed(
        (): CSSProperties => {
          return {
            width: `${props.width}px`,
            // padding 28
            height: `${unref(realHeightRef)}px`,
            padding: `8px`,
          };
        }
      );

      watchEffect(() => {
        props.useWrapper && setModalHeight();
      });
      watch(
        () => props.fullscreen,
        (v) => {
          setModalHeight();
          if (!v) {
            realHeightRef.value = minRealHeightRef.value;
          } else {
            minRealHeightRef.value = realHeightRef.value;
          }
        }
      );

      onMounted(() => {
        const { modalHeaderHeight, modalFooterHeight } = props;
        emit('ext-height', modalHeaderHeight + modalFooterHeight);
        // listenElResize();
      });

      onUnmounted(() => {
        stopElResizeFn && stopElResizeFn();
      });

      async function setModalHeight() {
        // 解决在弹窗关闭的时候监听还存在,导致再次打开弹窗没有高度
        // 加上这个,就必须在使用的时候传递父级的visible
        if (!props.visible) return;
        const wrapperRefDom = unref(wrapperRef);
        if (!wrapperRefDom) return;
        const bodyDom = wrapperRefDom.$el.parentElement;
        if (!bodyDom) return;
        bodyDom.style.padding = '0';
        await nextTick();

        try {
          const modalDom = bodyDom.parentElement && bodyDom.parentElement.parentElement;
          if (!modalDom) return;

          const modalRect = getComputedStyle(modalDom).top;
          const modalTop = Number.parseInt(modalRect);
          let maxHeight =
            window.innerHeight -
            modalTop * 2 +
            (props.footerOffset! || 0) -
            props.modalFooterHeight -
            props.modalHeaderHeight;

          /* // 距离顶部过进会出现滚动条
          if (modalTop < 40) {
            maxHeight -= 26;
          } */
          await nextTick();
          const spinEl = unref(spinRef);

          if (!spinEl) return;
          await nextTick();
          // if (!realHeight) {
          realHeight = spinEl.scrollHeight;
          // }

          if (props.fullscreen) {
            realHeightRef.value =
              window.innerHeight - props.modalFooterHeight - props.modalHeaderHeight;
          } else {
            realHeightRef.value = props.height
              ? props.height
              : realHeight > maxHeight
              ? maxHeight
              : realHeight;
          }
          emit('height-change', unref(realHeightRef));
        } catch (error) {
          console.log(error);
        }
      }

      return { prefixCls, wrapperRef, spinRef, spinStyle, setModalHeight };
    },
  });
</script>
