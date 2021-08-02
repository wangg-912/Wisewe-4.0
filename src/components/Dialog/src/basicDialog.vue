<template>
  <Dialog
    ref="dialogRef"
    @open="handleOpen"
    @close="handleCancel"
    v-bind="getBindValue"
    :fullscreen="fullScreenRef"
  >
    <template #title v-if="!$slots.title">
      <div class="dialog-slot-title">
        <DialogHeader :title="getMergeProps.title" @dblclick="handleTitleDbClick" />
        <DialogToolbar
          :showClose="getBindValue.showClose"
          :fullscreen="fullScreenRef"
          @close="handleCancel"
          @fullscreen="handleFullScreen"
        />
      </div>
    </template>
    <template #footer v-if="!$slots.footer">
      <DialogFooter v-bind="getProps" @save="handleOk" @close="handleCancel">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </DialogFooter>
    </template>
    <DialogWrapper
      :useWrapper="getProps.useWrapper"
      :footerOffset="wrapperFooterOffset"
      ref="modalWrapperRef"
      :loading="getProps.loading"
      :width="getProps.width"
      :height="getProps.height"
      :visible="visibleRef"
      :fullscreen="fullScreenRef"
      :renderFrame="getProps.renderFrame"
      :initData="getProps.initData"
      :url="getProps.url"
      :modalFooterHeight="footer !== undefined && !footer ? 0 : undefined"
      v-bind="omit(getProps.wrapperProps, 'visible', 'height')"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    >
      <iframe
        ref="frameRef"
        :id="getBindValue.iframeId"
        v-if="getBindValue.renderFrame && getBindValue.url"
        :src="getBindValue.url"
        frameborder="0"
        style="width: 100%; min-height: 100%; overflow: auto"
      ></iframe>
      <slot v-else> </slot>
    </DialogWrapper>

    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </Dialog>
</template>
<script lang="ts">
  import './dialog.scss';
  import {
    defineComponent,
    computed,
    ref,
    watch,
    unref,
    watchEffect,
    toRef,
    getCurrentInstance,
    nextTick,
  } from 'vue';
  import type { DialogProps, DialogMethods } from './types';
  import Dialog from './components/Dialog';
  import DialogToolbar from './components/dialogToolbar.vue';
  import DialogHeader from './components/dialogHeader.vue';
  import DialogWrapper from './components/dialogWrapper.vue';
  import DialogFooter from './components/dialogFooter.vue';
  import { isFunction, deepMerge } from '/@/utils/tools';
  import { basicProps } from './props';
  import { useFullScreen } from './hooks/useDialogFullScreen';
  import { omit } from 'lodash-es';

  export default defineComponent({
    name: 'BasicDialog',
    components: { Dialog, DialogToolbar, DialogHeader, DialogWrapper, DialogFooter },
    inheritAttrs: false,
    props: basicProps,
    emits: ['visible-change', 'height-change', 'cancel', 'save', 'register'],
    setup(props, { emit, attrs }) {
      /* console.log(props); */
      const dialogRef = ref<ComponentRef>(null);
      const visibleRef = ref(false);
      const propsRef = ref<Partial<DialogProps> | null>(null);
      const modalWrapperRef = ref<ComponentRef>(null);
      const frameRef = ref<HTMLElement | null>(null);
      // modal   Bottom and top height
      const extHeightRef = ref(0);
      const modalMethods: DialogMethods = {
        setModalProps,
        emitVisible: undefined,
        redoModalHeight: () => {
          nextTick(() => {
            if (unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).setModalHeight();
            }
          });
        },
      };

      const instance = getCurrentInstance();
      if (instance) {
        emit('register', modalMethods, instance.uid);
      }

      /**
       * @description 获取合并后的配置
       */
      const getMergeProps = computed(
        (): DialogProps => {
          return {
            ...props,
            ...(unref(propsRef) as any),
            ...{
              dialogId: `dialog_${instance.uid}`,
              iframeId: `iframe_${instance.uid}`,
            },
          };
        }
      );

      const { handleFullScreen, getCustomClass, fullScreenRef } = useFullScreen({
        modalWrapperRef,
        extHeightRef,
        customClass: toRef(getMergeProps.value, 'customClass'),
      });

      /**
       * @description 获取属性|不需要设置title
       */
      const getProps = computed(
        (): DialogProps => {
          const opt = {
            ...unref(getMergeProps),
            visible: unref(visibleRef),
            title: undefined,
          };
          return {
            ...opt,
            customClass: unref(getCustomClass.value),
          };
        }
      );
      /**
       *
       */
      const getBindValue = computed((): any => {
        const { url, dialogId } = unref(getProps);
        if (url && (/^(http|https|www)/g.test(url) || url.includes('.html'))) {
          return {
            ...attrs,
            ...unref(getProps),
            ...{
              url: url.includes('?')
                ? `${url}&dialogId=${dialogId}`
                : `${url}?dialogId=${dialogId}`,
              renderFrame: true,
            },
          };
        }
        return { ...attrs, ...unref(getProps) };
      });

      watchEffect(() => {
        visibleRef.value = !!props.visible;
        fullScreenRef.value = !!props.fullscreen;
      });

      watch(
        () => unref(visibleRef),
        (v) => {
          emit('visible-change', v);
          instance && modalMethods.emitVisible?.(v, instance.uid);
          nextTick(() => {
            //TODO 保留滚动顶部的配置供后续扩展使用
          });
        },
        {
          immediate: false,
        }
      );
      /**
       *@description 模态窗打开之后未渲染之前的操作
       */
      function handleOpen() {
        // TODO
        //const { initData } = getBindValue.value;
        //console.log(initData);
      }

      // 取消事件
      async function handleCancel(e: Event) {
        e?.stopPropagation();

        if (props.close && isFunction(props.close)) {
          const isClose: boolean = await props.close();
          visibleRef.value = !isClose;
          return;
        }

        visibleRef.value = false;
        emit('cancel');
      }

      /**
       * @description: 设置modal参数
       */
      function setModalProps(props: Partial<DialogProps>): void {
        // 保持最新属性配置
        propsRef.value = deepMerge(unref(propsRef) || {}, props);
        if (!Reflect.has(props, 'visible')) return;
        visibleRef.value = !!props.visible;
      }

      function handleOk() {
        const frameEle = unref(frameRef) as any;
        if (frameEle) {
          const $frame = frameEle.contentWindow;
          const frameData = $frame.dialogOk();
          emit('save', frameData);
        } else {
          emit('save');
        }
      }
      function handleHeightChange(height: string) {
        emit('height-change', height);
      }

      function handleExtHeight(height: number) {
        extHeightRef.value = height;
      }

      function handleTitleDbClick(e: ChangeEvent) {
        if (!props.canFullscreen) return;
        e.stopPropagation();
        handleFullScreen(e);
      }
      return {
        frameRef,
        dialogRef,
        handleOpen,
        handleCancel,
        getBindValue,
        getProps,
        handleFullScreen,
        fullScreenRef,
        getMergeProps,
        handleOk,
        visibleRef,
        omit,
        modalWrapperRef,
        handleExtHeight,
        handleHeightChange,
        handleTitleDbClick,
      };
    },
  });
</script>
