import { toRaw, ref } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import router from '/@/router';
import { tagStore } from '/@/store/modules/tag';

export function initAffixTags(){
  const affixList = ref<RouteLocationNormalized[]>([]);
  function filterAffixTags(routes: RouteLocationNormalized[]) {
    const tags: RouteLocationNormalized[] = [];
    routes && routes.forEach((route) => {
        if (route.meta && route.meta.affix) {
          tags.push(toRaw(route));
        }
      });
    return tags;
  }
  /**
   * @description: 设置固定标签
   */
   function addAffixTags(): void {
    const affixTags = filterAffixTags((router.getRoutes() as unknown) as RouteLocationNormalized[]);
    affixList.value = affixTags;
    for (const tag of affixTags) {
      tagStore.addTagAction(({
        meta: tag.meta,
        name: tag.name,
        path: tag.path,
      } as unknown) as RouteLocationNormalized);
    }
  }

  let isAddAffix = false;
  if (!isAddAffix) {
    addAffixTags();
    isAddAffix = true;
  }
  return affixList.value.map((item) => item.meta?.title).filter(Boolean);
}
