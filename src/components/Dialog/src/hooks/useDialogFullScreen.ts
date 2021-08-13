import { computed, Ref, ref, unref } from 'vue';

export interface UseFullScreenContext {
  customClass: Ref<string | undefined>;
  modalWrapperRef: Ref<ComponentRef>;
  extHeightRef: Ref<number>;
}
/**
 * @description 热全屏钩子函数
 * @param context
 * @returns
 */
export function useFullScreen(context: UseFullScreenContext) {
  const fullScreenRef = ref(false);
  const getCustomClass = computed(() => {
    const clsName = unref(context.customClass) || '';
    return unref(fullScreenRef) ? `is-fullscreen ${clsName} ` : unref(clsName);
  });
  /**
   * @description 全屏事件触发
   * @param e
   */
  function handleFullScreen(e: Event) {
    e && e.stopPropagation();
    fullScreenRef.value = !unref(fullScreenRef);
  }
  return { getCustomClass, handleFullScreen, fullScreenRef };
}
