import type {
  UseDrawerReturnType,
  DrawerInstance,
  ReturnMethods,
  DrawerProps,
  UseDrawerInnerReturnType,
} from './types';
import {
  ref,
  getCurrentInstance,
  unref,
  reactive,
  watchEffect,
  nextTick,
  toRaw,
  computed,
} from 'vue';

import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/tools';
import { tryOnUnmounted, isInSetup } from '/@/utils/helper/vueHelper';
import { isEqual } from 'lodash-es';
import { error } from '/@/utils/log';

const dataTransferRef = reactive<any>({});
const visibleData = reactive<{ [key: number]: boolean }>({});
export function useDrawer(): UseDrawerReturnType {
  isInSetup();

  const drawerRef = ref<DrawerInstance | null>(null);
  const loadedRef = ref<Nullable<boolean>>(false);
  const uidRef = ref<string>('');
  /**
   * @description 注册方法
   * @param drawerInstance 
   * @param uuid 
   * @returns 
   */
  function register(drawerInstance: DrawerInstance, uuid: string) {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawerRef.value = null;
        dataTransferRef[unref(uidRef)] = null;
      });
    if (unref(loadedRef) && isProdMode() && drawerInstance === unref(drawerRef)) {
      return;
    }
    uidRef.value = uuid;
    drawerRef.value = drawerInstance;
    loadedRef.value = true;
    drawerInstance.emitVisible = (visible: boolean, uid: number) => {
      visibleData[uid] = visible;
    };
  }
  /**
   * @description 检测应用类型
   * @returns instance
   */
  const getInstance = () => {
    const instance = unref(drawerRef);
    if (!instance) {
      error('useDrawer instance is undefined!');
    }
    return instance;
  };
  const methods: ReturnMethods = {
    /**
     * @description 设置抽屉属性
     * @param {Object} props 满足接口的属性集合
     */
    setDrawerProps: (props: Partial<DrawerProps>): void => {
      getInstance()?.setDrawerProps(props);
    },
    /**
     * @description
     */
    getVisible: computed((): boolean => {
      return visibleData[~~unref(uidRef)];
    }),
    /**
     * @description 打开抽屉
     * @param { Boolean} visible 是否显示
     * @param data 打开时间
     * @param {Boolean} openOnSet 打开设置
     * @returns
     */
    openDrawer: <T = any>(visible = true, data?: T, openOnSet = true): void => {
      getInstance()?.setDrawerProps({
        visible: visible,
      });
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
//TODO
export const useDrawerInner = (callbackFn?: Fn): UseDrawerInnerReturnType => {
  const drawerInstanceRef = ref<Nullable<DrawerInstance>>(null);
  const currentInstance = getCurrentInstance();
  const uidRef = ref<string>('');

  if (!currentInstance) {
    error('useDrawerInner instance is undefined!');
  }
  const getInstance = () => {
    const instance = unref(drawerInstanceRef);
    if (!instance) {
      error('useDrawerInner instance is undefined!');
      return;
    }
    return instance;
  };

  const register = (modalInstance: DrawerInstance, uuid: string) => {
    isProdMode() &&
      tryOnUnmounted(() => {
        drawerInstanceRef.value = null;
      });

    uidRef.value = uuid;
    drawerInstanceRef.value = modalInstance;
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
        getInstance()?.setDrawerProps({ loading });
      },
      getVisible: computed((): boolean => {
        return visibleData[~~unref(uidRef)];
      }),
      closeDrawer: () => {
        getInstance()?.setDrawerProps({ visible: false });
      },

      setDrawerProps: (props: Partial<DrawerProps>) => {
        getInstance()?.setDrawerProps(props);
      },
    },
  ];
};
