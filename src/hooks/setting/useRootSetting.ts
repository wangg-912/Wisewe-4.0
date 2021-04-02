import { computed, unref } from 'vue';
import type { ProjectConfig } from '/@/type/config';
import { appStore } from '/@/store/modules/app';
import { ContentEnum } from '/@/enums/appEnum';
type RootSetting = Omit<ProjectConfig,'headerSetting' | 'menuSetting' | 'multiTabsSetting'>;

const getRootSetting = computed((): RootSetting => appStore.getProjectConfig);


const getShowLogo = computed(() => unref(getRootSetting).showLogo);
const getShowBreadCrumb = computed(() => unref(getRootSetting).showBreadCrumb);
const getShowBreadCrumbIcon = computed(() => unref(getRootSetting).showBreadCrumbIcon);
const getPageLoading = computed(() => appStore.getPageLoading);
const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive);
const getCanEmbedIFramePage = computed(() => unref(getRootSetting).canEmbedIFramePage);

export function useRootSetting() {
  return {
    getPageLoading,
    getOpenKeepAlive,
    getShowLogo,
    getShowBreadCrumb,
    getCanEmbedIFramePage,
    getShowBreadCrumbIcon,
  }
}
