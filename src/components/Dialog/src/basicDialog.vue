<template>
  <Dialog @close="handleCancel" v-bind="getBindValue">
    <template #title v-if="!$slots.title">
      <DialogHeader :title="getMergeProps.title" @dblclick="handleTitleDbClick" />
    </template>
    <template #footer v-if="!$slots.footer">
      <DialogFooter v-bind="getProps" @ok="handleOk" @close="handleCancel">
        <template #[item]="data" v-for="item in Object.keys($slots)">
          <slot :name="item" v-bind="data"></slot>
        </template>
      </DialogFooter>
    </template>
    <DialogWrapper
      :useWrapper="getProps.useWrapper"
      :footerOffset="wrapperFooterOffset"
      :fullscreen="fullScreenRef"
      ref="modalWrapperRef"
      :loading="getProps.loading"
      :minHeight="getProps.minHeight"
      :width="getProps.width"
      :height="getProps.height"
      :visible="visibleRef"
      :modalFooterHeight="footer !== undefined && !footer ? 0 : undefined"
      v-bind="omit(getProps.wrapperProps, 'visible', 'height')"
      @ext-height="handleExtHeight"
      @height-change="handleHeightChange"
    />

    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data"></slot>
    </template>
  </Dialog>
</template>
<script lang="ts">
  import type { ModalProps, ModalMethods } from './types';
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
    emits: ['visible-change', 'height-change', 'cancel', 'ok', 'register'],
    setup(props, { emit, attrs }) {
      const visibleRef = ref(false);
      const propsRef = ref<Partial<ModalProps> | null>(null);
      const modalWrapperRef = ref<ComponentRef>(null);

      // modal   Bottom and top height
      const extHeightRef = ref(0);
      const modalMethods: ModalMethods = {
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

      // Custom title component: get title
      const getMergeProps = computed(
        (): ModalProps => {
          return {
            ...props,
            ...(unref(propsRef) as any),
          };
        }
      );

      const { handleFullScreen, getCustomClass, fullScreenRef } = useFullScreen({
        modalWrapperRef,
        extHeightRef,
        customClass: toRef(getMergeProps.value, 'customClass'),
      });

      // modal component does not need title
      const getProps = computed(
        (): ModalProps => {
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

      const getBindValue = computed((): any => {
        return { ...attrs, ...unref(getProps) };
      });
      console.log(getBindValue);

      watchEffect(() => {
        visibleRef.value = !!props.visible;
        fullScreenRef.value = !!props.defaultFullscreen;
      });

      watch(
        () => unref(visibleRef),
        (v) => {
          emit('visible-change', v);
          instance && modalMethods.emitVisible?.(v, instance.uid);
          nextTick(() => {
            /* if (props.scrollTop && v && unref(modalWrapperRef)) {
              (unref(modalWrapperRef) as any).scrollTop();
            } */
          });
        },
        {
          immediate: false,
        }
      );

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
      function setModalProps(props: Partial<ModalProps>): void {
        // Keep the last setModalProps
        propsRef.value = deepMerge(unref(propsRef) || {}, props);
        if (!Reflect.has(props, 'visible')) return;
        visibleRef.value = !!props.visible;
      }

      function handleOk() {
        emit('ok');
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
