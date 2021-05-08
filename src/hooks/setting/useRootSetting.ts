import { computed, unref } from 'vue';
import type { ProjectConfig } from '/@/type/config';
import { appStore } from '/@/store/modules/app';
import { ContentEnum } from '/@/enums/appEnum';
type RootSetting = Omit<ProjectConfig, 'headerSetting' | 'menuSetting' | 'tagsSetting'>;
const getRootSetting = computed((): RootSetting => appStore.getProjectConfig);
const getFullContent = computed(() => unref(getRootSetting).fullContent);
const getShowLogo = computed(() => unref(getRootSetting).showLogo);
const getShowBreadCrumb = computed(() => unref(getRootSetting).showBreadCrumb);
const getShowBreadCrumbIcon = computed(() => unref(getRootSetting).showBreadCrumbIcon);
const getShowSetting = computed(() => unref(getRootSetting).showSetting);
const getSettingPosition = computed(() => unref(getRootSetting).settingButtonPosition);
const getPageLoading = computed(() => appStore.getPageLoading);
const getOpenKeepAlive = computed(() => unref(getRootSetting).openKeepAlive);
const getCanEmbedIFramePage = computed(() => unref(getRootSetting).canEmbedIFramePage);
const getThemeColor = computed(() => unref(getRootSetting).themeColor);
const getGrayMode = computed(() => unref(getRootSetting).grayMode);
const getColorWeak = computed(() => unref(getRootSetting).colorWeak);
const getShowFooter = computed(() => unref(getRootSetting).showfooter);
const getMobileTriggrState = computed(() => unref(getRootSetting).mobileTrigger);
function toggleMobileTriggerState(value: boolean) {
  appStore.COMMITPROJECTCONFIGSTATE({
    mobileTrigger: value,
   });
}

export function useRootSetting() {
  return {
    getPageLoading,
    getFullContent,
    getOpenKeepAlive,
    getShowLogo,
    getShowBreadCrumb,
    getShowSetting,
    getSettingPosition,
    getCanEmbedIFramePage,
    getShowBreadCrumbIcon,
    getThemeColor,
    getGrayMode,
    getColorWeak,
    getShowFooter,
    getMobileTriggrState,
    toggleMobileTriggerState,
  }
}
