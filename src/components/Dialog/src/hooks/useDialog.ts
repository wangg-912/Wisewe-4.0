import type {
  UseDialogReturnType,
  DialogMethods,
  DialogProps,
  ReturnMethods,
  UseModalInnerReturnType,
} from '../types';
import {
  ref,
  onUnmounted,
  unref,
  getCurrentInstance,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
} from 'vue';
import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/tools';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted, isInSetup } from '/@/utils/helper/vueHelper';
import { error } from '/@/utils/log';
import { computed } from 'vue';
const dataTransferRef = reactive<any>({});

const visibleData = reactive<{ [key: number]: boolean }>({});

/**
 * @description: 适用于独立模态和外部独立使用
 */
export function useDialog(): UseDialogReturnType {
  isInSetup();
  const modalRef = ref<Nullable<DialogMethods>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const uidRef = ref<string>('');
  /**
   * @description 注册模态窗的所有事件及上下文独立ID
   * @param modalMethod
   * @param uuid
   * @returns
   */
  function register(modalMethod: DialogMethods, uuid: string) {
    uidRef.value = uuid;
    /**
     * @description 生产模式
     */
    isProdMode() &&
      onUnmounted(() => {
        modalRef.value = null;
        loadedRef.value = false;
        dataTransferRef[unref(uidRef)] = null;
      });
    if (unref(loadedRef) && isProdMode() && modalMethod === unref(modalRef)) return;

    modalRef.value = modalMethod;
    modalMethod.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }

  const getInstance = () => {
    const instance = unref(modalRef);
    if (!instance) {
      error('useModal instance is undefined!');
    }
    return instance;
  };

  const methods: ReturnMethods = {
    /**
     * @description 设置模态窗的属性
     * @param props
     */
    setModalProps: (props: Partial<DialogProps>): void => {
      getInstance()?.setModalProps(props);
    },
    /**
     * @description 获取显示状态
     */
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)];
    }),
    /**
     * @description 获取初始化参数
     */
    getTransferData: computed((): object =>
      Object.assign(
        { initData: dataTransferRef[unref(uidRef)] },
        { dialogId: unref(uidRef), iframeId: unref(uidRef) }
      )
    ),
    /**
     * @description 重置模态窗的高度
     */
    redoModalHeight: () => {
      getInstance()?.redoModalHeight?.();
    },
    /**
     * @description 打开模态窗
     * @param visible
     * @param data
     * @param openOnSet
     * @returns
     */
    openDialog: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setModalProps(
        Object.assign({}, data, {
          visible: visible,
        })
      );
      if (!data) return;
      if (openOnSet) {
        dataTransferRef[unref(uidRef)] = null;
        dataTransferRef[unref(uidRef)] = data;
        return;
      }
      const equal = isEqual(toRaw(dataTransferRef[unref(uidRef)]), data);
      if (!equal) {
        dataTransferRef[unref(uidRef)] = data;
      }
    },
  };
  return [register, methods];
}
/**
 * @description 适用于模态窗内部使用  TODO
 * @param callbackFn
 * @returns
 */
export const useDialogInner = (callbackFn?: Fn): UseModalInnerReturnType => {
  const modalInstanceRef = ref<Nullable<DialogMethods>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  // currentInstall.type.emits = [...currentInstall.type.emits, 'register'];
  // Object.assign(currentInstall.type.emits, ['register']);

  const getInstance = () => {
    const instance = unref(modalInstanceRef);
    if (!instance) {
      error('useModalInner instance is undefined!');
    }
    return instance;
  };

  const register = (modalInstance: DialogMethods, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        modalInstanceRef.value = null;
      });
    uidRef.value = uuid;
    modalInstanceRef.value = modalInstance;
    currentInstance?.emit('register', modalInstance, uuid);
  };

  watchEffect(() => {
    const data = dataTransferRef[unref(uidRef)];
    if (!data) return;
    if (!callbackFn || !isFunction(callbackFn)) return;
    nextTick(() => {
      callbackFn(data);
    });
  });

  return [
    register,
    {
      changeLoading: (loading = true) => {
        getInstance()?.setModalProps({ loading });
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)];
      }),

      changeOkLoading: (loading = true) => {
        getInstance()?.setModalProps({ confirmLoading: loading });
      },

      closeModal: () => {
        getInstance()?.setModalProps({ visible: false });
      },

      setModalProps: (props: Partial<DialogProps>) => {
        getInstance()?.setModalProps(props);
      },
    },
  ];
};
