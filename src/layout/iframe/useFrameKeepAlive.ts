import router from '/@/router';
import type { AppRouteRecordRaw } from '/@/router/types';
import { computed, toRaw, unref } from 'vue';
import { tagStore } from '/@/store/modules/tag';
import { uniqBy } from 'lodash-es';
import { useTagSetting } from '/@/hooks/setting/useTagSetting';


export function useFrameKeepAlive() {
  const { currentRoute } = router;
  const { getTagsShow } = useTagSetting();

  const getFramePages = computed(() => {
    const ret =
      getAllFramePages((toRaw(router.getRoutes()) as unknown) as AppRouteRecordRaw[]) || [];
    return ret;
  });

  const getOpenTabList = computed((): string[] => {
    return tagStore.getTagsState.reduce((prev: string[], next: any) => {
      if (next.meta && Reflect.has(next.meta, 'frameSrc')) {
        prev.push(next.name as string);
      }
      return prev;
    }, []);
  });

  /**
   * @description 获取全部Frame页面
   * @param routes
   * @returns
   */
  function getAllFramePages(routes: AppRouteRecordRaw[]): AppRouteRecordRaw[] {
    let res: AppRouteRecordRaw[] = [];
    /* console.log(routes); */
    for (const route of routes) {
      const { meta: { frameSrc } = {}, children } = route;
      if (frameSrc) {
        res.push(route);
      }
      if (children && children.length) {
        res.push(...getAllFramePages(children));
      }
    }
    res = uniqBy(res, 'name');
    return res;
  }

  function showIframe(item: AppRouteRecordRaw) {
    return item.name === unref(currentRoute).name;
  }

  function hasRenderFrame(name: string) {
    if (!unref(getTagsShow)) {
      return router.currentRoute.value.name === name;
    }
    return unref(getOpenTabList).includes(name);
  }

  return { hasRenderFrame, getFramePages, showIframe, getAllFramePages };
}
