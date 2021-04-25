import { toRaw, unref } from 'vue';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import { PageEnum } from '/@/enums/appEnum';
import store from '/@/store';
import router from '/@/router';
import { hotModuleUnregisterModule } from '/@/utils/helper/vuexHelper';
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/constant';
import { getRoute } from '/@/router/helper/routeHelper';
import { useGo, useRedo } from '/@/hooks/web/usePage';
import { cloneDeep } from 'lodash-es';

const NAME = 'tag';

hotModuleUnregisterModule(NAME);

export const PAGE_LAYOUT_KEY = '__PAGE_LAYOUT__';

function isGotoPage() {
  const go = useGo();
  go(unref(router.currentRoute).path, true);
}

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Tag extends VuexModule {
  cachedMapState = new Map<string, string[]>();
  // tab list
  tagsState: RouteLocationNormalized[] = [];

  get getTagsState() {
    return this.tagsState;
  }

  get getCurrentTab(): RouteLocationNormalized {
    const route = unref(router.currentRoute);
    return this.tagsState.find((item) => item.path === route.path)!;
  }

  get getCachedMapState(): Map<string, string[]> {
    return this.cachedMapState;
  }

  @Mutation
  COMMITCLEARCACHE(): void {
    this.cachedMapState = new Map();
  }

  @Mutation
  GOTOPAGE() {
    const go = useGo();
    const len = this.tagsState.length;
    const { path } = unref(router.currentRoute);

    let toPath: PageEnum | string = PageEnum.BASE_HOME;

    if (len > 0) {
      const page = this.tagsState[len - 1];
      const p = page.fullPath || page.path;
      if (p) {
        toPath = p;
      }
    }
    // Jump to the current page and report an error
    path !== toPath && go(toPath as PageEnum, true);
  }
  @Mutation
  private DELTAGVIEW(view: RouteLocationNormalized): void {
    for (const [i, v] of this.tagsState.entries()) {
      if (v.path === view.path) {
        this.tagsState.splice(i, 1);
        break;
      }
    }
  }

  @Mutation
  COMMITCACHEMAPSTATE(): void {
    const cacheMap = new Map<string, string[]>();

    const pageCacheSet = new Set<string>();
    this.tagsState.forEach((tab) => {
      const item = getRoute(tab);
      const needCache = !item.meta?.ignoreKeepAlive;
      if (!needCache) return;

      if (item.meta?.affix) {
        const name = item.name as string;
        pageCacheSet.add(name);
      } else if (item?.matched && needCache) {
        const matched = item?.matched;
        if (!matched) return;
        const len = matched.length;

        if (len < 2) return;

        for (let i = 0; i < matched.length; i++) {
          const key = matched[i].name as string;

          if (i < 2) {
            pageCacheSet.add(key);
          }
          if (i < len - 1) {
            const { meta, name } = matched[i + 1];
            if (meta && (meta.affix || needCache)) {
              const mapList = cacheMap.get(key) || [];
              if (!mapList.includes(name as string)) {
                mapList.push(name as string);
              }
              cacheMap.set(key, mapList);
            }
          }
        }
      }
    });

    cacheMap.set(PAGE_LAYOUT_KEY, Array.from(pageCacheSet));
    this.cachedMapState = cacheMap;
  }

  @Mutation
  COMMITTAGROUTESSTATE(route: RouteLocationNormalized): void {
    const { path, fullPath, params, query } = route;
    let updateIndex = -1;
    // 已经存在的页面，不重复添加tab
    const hasTab = this.tagsState.some((tab, index) => {
      updateIndex = index;
      return (tab.fullPath || tab.path) === (fullPath || path);
    });
    if (hasTab) {
      const curTab = toRaw(this.tagsState)[updateIndex];
      if (!curTab) return;
      curTab.params = params || curTab.params;
      curTab.query = query || curTab.query;
      curTab.fullPath = fullPath || curTab.fullPath;
      this.tagsState.splice(updateIndex, 1, curTab);
      return;
    }
    this.tagsState = cloneDeep([...this.tagsState, route]);
  }
  @Action
  addTagAction(route: RouteLocationNormalized) {
    const { path, name } = route;
    // 404  The page does not need to add a tab
    if (
      path === PageEnum.ERROR_PAGE ||
      !name ||
      [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name as string)
    ) {
      return;
    }
    this.COMMITTAGROUTESSTATE(getRoute(route));

    this.COMMITCACHEMAPSTATE();
  }
  @Action
  deleteTag(tag: RouteLocationNormalized) {
    this.DELTAGVIEW(tag);
  }
}

export const tagStore = getModule<Tag>(Tag);
