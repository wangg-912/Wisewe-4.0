import { toRaw, ref, nextTick } from 'vue';
import { RouteLocationNormalized } from 'vue-router';
import { useProjectSetting } from '/@/hooks/setting';
import { useDesign } from '/@/hooks/web/useDesign';
import router from '/@/router';
import { tagStore } from '/@/store/modules/tag';
import { isNullAndUnDef } from '/@/utils/tools';

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
   function addAffixTabs(): void {
    const affixTabs = filterAffixTags((router.getRoutes() as unknown) as RouteLocationNormalized[]);
    affixList.value = affixTabs;
    for (const tag of affixTabs) {
      tagStore.addTagAction(({
        meta: tag.meta,
        name: tag.name,
        path: tag.path,
      } as unknown) as RouteLocationNormalized);
    }
  }

  let isAddAffix = false;
  if (!isAddAffix) {
    addAffixTabs();
    isAddAffix = true;
  }
  return affixList.value.map((item) => item.meta?.title).filter(Boolean);
}
