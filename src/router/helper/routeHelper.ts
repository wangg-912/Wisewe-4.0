import type { RouteLocationNormalized, RouteRecordNormalized } from 'vue-router';
/* import { cloneDeep } from 'lodash-es';
import type { AppRouteModule, AppRouteRecordRaw } from '/@/router/types';
import { getParentLayout, LAYOUT } from '/@/router/constant';
import { warn } from '/@/utils/log';

export type LayoutMapKey = 'LAYOUT';

const LayoutMap = new Map<LayoutMapKey, () => Promise<typeof import('*.vue')>>();*/

//const dynamicViewsModules = import.meta.glob('../../views/**/*.{vue,tsx}');

// Return to the new routing structure, not affected by the original example
export function getRoute(route: RouteLocationNormalized): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}
