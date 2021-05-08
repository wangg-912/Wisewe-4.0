import { unref } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
import { isString } from '/@/utils/tools';
import router from '/@/router';
import { PageEnum } from '/@/enums/appEnum';

export type RouteLocationRawEx = Omit<RouteLocationRaw, 'path'> & { path: PageEnum };

/**
 * @description 错误函数
 * @param {Object} e
 */
function handleError(e: Error) {
  console.error(e);
}
/**
 * @description 页面加载钩子
 * @returns
 */
export function useGo() {
  const { push, replace } = router;
  function go(opt: PageEnum | RouteLocationRawEx | string = PageEnum.BASE_HOME, isReplace = false) {
    if (!opt) return;
    if (isString(opt)) {
      isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError);
    } else {
      const o = opt as RouteLocationRaw;
      isReplace ? replace(o).catch(handleError) : push(o).catch(handleError);
    }
  }
  return go;
}
/**
 * @description 页面重新加载钩子
 */
export const useRedo = () => {
  const { push, currentRoute } = router;
  const { query, params } = currentRoute.value;
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      push({
        path: '/redirect' + unref(currentRoute).fullPath,
        query,
        params,
      }).then(() => resolve(true));
    });
  }
  return redo;
};
