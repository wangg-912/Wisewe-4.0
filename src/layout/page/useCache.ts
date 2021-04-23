import type { FunctionalComponent } from 'vue';
import type { RouteLocation } from 'vue-router';

import { computed, ref, unref } from 'vue';
import { useRootSetting } from '/@/hooks/setting/useRootSetting';
import { tryTsxEmit } from '/@/utils/helper/vueHelper';
import { tabStore, PAGE_LAYOUT_KEY } from '/@/store/modules/tag';

export function getKey(component: FunctionalComponent & { type: Indexable }, route: RouteLocation) {
  return !!component?.type.parentView ? {} : { key: route.fullPath };
}
